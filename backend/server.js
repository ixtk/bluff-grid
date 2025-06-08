const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
const verifyAuth = require('./middleware/verifyAuth'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/your_database_name', {})
  .then(() => {})
  .catch(err => {});

app.post('/api/users', async (req, res) => {
  try {
    const { firebaseId } = req.body;

    if (!firebaseId) {
      return res.status(400).json({ message: 'firebaseId is required' });
    }

    let user = await User.findOne({ firebaseId });

    if (user) {
      return res.status(409).json({ message: 'User with this firebaseId already exists', user });
    } else {
      const newUser = new User({ firebaseId });
      await newUser.save();
      res.status(201).json({ message: 'User successfully added', user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.get('/api/protected-data', verifyAuth, async (req, res) => {
 
  const userData = req.user; 
  res.json({ message: 'You have access to protected data!', userData });
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {});