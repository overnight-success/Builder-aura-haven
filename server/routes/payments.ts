import { RequestHandler } from "express";
import Stripe from "stripe";
import { logActivity } from "./admin";
import fs from "fs";
import path from "path";

// Initialize Stripe (you'll need to add your Stripe secret key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_...", {
  apiVersion: "2024-06-20",
});

const PAYMENTS_FILE = path.join(process.cwd(), "data", "payments.json");

// Helper functions
const loadPayments = (): any[] => {
  try {
    if (fs.existsSync(PAYMENTS_FILE)) {
      const data = fs.readFileSync(PAYMENTS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading payments:", error);
  }
  return [];
};

const savePayments = (payments: any[]) => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  try {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
  } catch (error) {
    console.error("Error saving payments:", error);
    throw error;
  }
};

// Create Stripe checkout session
export const handleCreateCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { priceId, userEmail, planName } = req.body;

    if (!priceId || !userEmail || !planName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment-cancelled`,
      customer_email: userEmail,
      metadata: {
        userEmail,
        planName,
      },
    });

    // Log the payment attempt
    logActivity(
      userEmail,
      userEmail,
      "payment",
      `Payment initiated for ${planName}`,
      { sessionId: session.id, planName, amount: 0 },
    );

    res.json({ url: session.url });
  } catch (error) {
    console.error("Create checkout session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Handle Stripe webhook for payment events
export const handleStripeWebhook: RequestHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;

    case "invoice.payment_succeeded":
      const invoice = event.data.object as Stripe.Invoice;
      await handleRecurringPayment(invoice);
      break;

    case "invoice.payment_failed":
      const failedInvoice = event.data.object as Stripe.Invoice;
      await handleFailedPayment(failedInvoice);
      break;

    case "customer.subscription.deleted":
      const subscription = event.data.object as Stripe.Subscription;
      await handleCancelledSubscription(subscription);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Handle successful payment
const handleSuccessfulPayment = async (session: Stripe.Checkout.Session) => {
  const userEmail = session.metadata?.userEmail || session.customer_email;
  const planName = session.metadata?.planName;
  const amount = (session.amount_total || 0) / 100; // Convert cents to dollars

  if (!userEmail) {
    console.error("No user email found in session");
    return;
  }

  // Save payment record
  const payments = loadPayments();
  const payment = {
    id: session.id,
    userId: userEmail,
    userEmail,
    amount,
    status: "completed",
    plan: planName || "Unknown",
    timestamp: new Date().toISOString(),
    sessionId: session.id,
    subscriptionId: session.subscription,
  };

  payments.push(payment);
  savePayments(payments);

  // Log activity
  logActivity(
    userEmail,
    userEmail,
    "payment",
    `Payment completed for ${planName} - $${amount}`,
    { sessionId: session.id, planName, amount },
  );

  console.log(`Payment completed: ${userEmail} - ${planName} - $${amount}`);
};

// Handle recurring payment
const handleRecurringPayment = async (invoice: Stripe.Invoice) => {
  const userEmail = invoice.customer_email;
  const amount = (invoice.amount_paid || 0) / 100;

  if (!userEmail) {
    console.error("No user email found in invoice");
    return;
  }

  // Save payment record
  const payments = loadPayments();
  const payment = {
    id: invoice.id,
    userId: userEmail,
    userEmail,
    amount,
    status: "completed",
    plan: "Recurring",
    timestamp: new Date().toISOString(),
    subscriptionId: invoice.subscription,
  };

  payments.push(payment);
  savePayments(payments);

  // Log activity
  logActivity(
    userEmail,
    userEmail,
    "payment",
    `Recurring payment completed - $${amount}`,
    { invoiceId: invoice.id, amount },
  );

  console.log(`Recurring payment: ${userEmail} - $${amount}`);
};

// Handle failed payment
const handleFailedPayment = async (invoice: Stripe.Invoice) => {
  const userEmail = invoice.customer_email;
  const amount = (invoice.amount_due || 0) / 100;

  if (!userEmail) {
    console.error("No user email found in failed invoice");
    return;
  }

  // Save failed payment record
  const payments = loadPayments();
  const payment = {
    id: invoice.id,
    userId: userEmail,
    userEmail,
    amount,
    status: "failed",
    plan: "Failed Payment",
    timestamp: new Date().toISOString(),
    subscriptionId: invoice.subscription,
  };

  payments.push(payment);
  savePayments(payments);

  // Log activity
  logActivity(userEmail, userEmail, "payment", `Payment failed - $${amount}`, {
    invoiceId: invoice.id,
    amount,
  });

  console.log(`Payment failed: ${userEmail} - $${amount}`);
};

// Handle cancelled subscription
const handleCancelledSubscription = async (
  subscription: Stripe.Subscription,
) => {
  // You would update user's subscription status here
  console.log(`Subscription cancelled: ${subscription.id}`);
};

// Check payment status
export const handlePaymentStatus: RequestHandler = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID required" });
    }

    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string,
    );

    res.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
    });
  } catch (error) {
    console.error("Payment status check error:", error);
    res.status(500).json({ error: "Failed to check payment status" });
  }
};

// Get user subscription status
export const handleSubscriptionStatus: RequestHandler = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    const payments = loadPayments();
    const userPayments = payments.filter(
      (p) => p.userEmail === userEmail && p.status === "completed",
    );

    const hasActiveSubscription = userPayments.length > 0;
    const latestPayment = userPayments[userPayments.length - 1];

    res.json({
      hasActiveSubscription,
      subscriptionStatus: hasActiveSubscription ? "paid" : "free",
      latestPayment,
      totalSpent: userPayments.reduce((sum, p) => sum + p.amount, 0),
    });
  } catch (error) {
    console.error("Subscription status error:", error);
    res.status(500).json({ error: "Failed to check subscription status" });
  }
};
