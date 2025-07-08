const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from dist/spa
app.use(express.static(path.join(__dirname, "dist/spa")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/spa/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Access your app at: http://localhost:${PORT}`);
});
