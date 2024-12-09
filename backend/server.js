const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Import path for serving frontend
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const documentRoutes = require("./routes/documents");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/documents", documentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  });

// Serve Frontend
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

// Catch-All Route to Serve React Frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Global Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "build")));

// // API routes (if any)
// // Example:
// // app.use("/api/auth", require("./routes/auth"));
// // app.use("/api/notes", require("./routes/notes"));
// // app.use("/api/documents", require("./routes/documents"));

// // Catch-all handler for React
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
