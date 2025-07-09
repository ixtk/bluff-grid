import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import User from  "./Models/User.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

admin.initializeApp({
  "projectId": "bluff-grid-8cdfa"
});

const verifyAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
app.post('/api/users', verifyAuth, async (req, res) => {
  try {
    const { uid, email, username, photoUrl } = req.user;

    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = await User.create({
        firebaseId: uid,
        email,
        username,
        photoUrl,
      });
    }

    res.status(201).send({ success: true });
  } catch (err) {
    console.error('User creation failed:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.post('/save-grid', verifyAuth, async (req, res) => {
  try {
    const { title, statements, truthIndex } = req.body;
    if (!title || statements?.length !== 9 || truthIndex == null) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    let user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) {
      user = await User.create({
        firebaseId: req.user.uid,
        email: req.user.email,
      });
    }

    const newGrid = {
      title,
      statements,
      trueStatement: statements[truthIndex],
    };

    user.grids.push(newGrid);
    await user.save();

    res.json({ message: 'OK', grid: newGrid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/grids', verifyAuth, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid }, { grids: 1, _id: 0 });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.grids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/grids/:id', verifyAuth, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.grids = user.grids.filter(g => g._id.toString() !== req.params.id);
    await user.save();

    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server ready on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
