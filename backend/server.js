const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes"); // Include routes for notes
const documentRoutes = require("./routes/documents"); // Include routes for documents
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);  // Route for managing notes
app.use("/api/documents", documentRoutes); // Route for managing documents

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
