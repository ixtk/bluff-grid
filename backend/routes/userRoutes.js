import express from 'express';
import verifyAuth from '../Middleware/verifyAuth.js';
import User from '../Models/User.js';

// exla uceb gadmovwer me chemtan moica 2 wuti da davtestav
// daaqomite es da dapushe

const router = express.Router();

router.post('/', verifyAuth, async (req, res) => {
  try {
    const { uid } = req.user;
    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = new User({ firebaseId: uid });
      await user.save();
    }

    res.status(200).json({ message: 'User processed', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
