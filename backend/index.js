import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);

app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅  MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

admin.initializeApp({
  credential: admin.credential.cert(
    require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT))
  )
});

const verifyAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No token" });
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const gridSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    statements: { type: [String], required: true, minlength: 9, maxlength: 9 },
    trueStatement: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  grids: { type: [gridSchema], default: [] }
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.post("/save-grid", verifyAuth, async (req, res) => {
  try {
    const { title, statements, truthIndex } = req.body;
    if (!title || !statements?.length === 9 || truthIndex == null)
      return res.status(400).json({ message: "Invalid payload" });

    const foundUser =
      (await User.findOne({ firebaseId: req.user.uid })) ||
      (await User.create({
        firebaseId: req.user.uid,
        email: req.user.email
      }));

    const newGrid = {
      title,
      statements,
      trueStatement: statements[truthIndex]
    };

    foundUser.grids.push(newGrid);
    await foundUser.save();

    res.json({ message: "OK", grid: newGrid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/grids", verifyAuth, async (req, res) => {
  try {
    const user = await User.findOne(
      { firebaseId: req.user.uid },
      { grids: 1, _id: 0 }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.grids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/grids/:id", verifyAuth, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.grids = user.grids.filter(
      (g) => g._id.toString() !== req.params.id
    );
    await user.save();

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  Server ready on port ${PORT}`));
