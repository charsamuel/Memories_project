import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import PostMessage from "./models/postMessage.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded payload limit

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://reasons:whyiloveyou78@users.831e1jg.mongodb.net/?retryWrites=true&w=majority&appName=users"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/api/memories", async (req, res) => {
  try {
    const memories = await PostMessage.find();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memories" });
  }
});

app.post("/api/memories", async (req, res) => {
  //console.log("Received POST request with body:", req.body);
  const { title, description, image } = req.body;

  if (!title || !description || !image ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMemory = new PostMessage({
      title,
      description,
      image,
    });

    await newMemory.save();
    console.log("Memory added:", newMemory);
    res.status(201).json(newMemory);
  } catch (error) {
    console.error("Error saving memory:", error);
    res.status(500).json({ error: "Failed to add memory" });
  }
});

app.put("/api/memories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const updatedMemory = await PostMessage.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedMemory) {
      return res.status(404).json({ error: "Memory not found" });
    }

    res.json(updatedMemory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update memory" });
  }
});

app.delete("/api/memories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMemory = await PostMessage.findByIdAndDelete(id);

    if (!deletedMemory) {
      return res.status(404).json({ error: "Memory not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete memory" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
