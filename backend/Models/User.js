import mongoose from 'mongoose';
const gridSchema = new mongoose.Schema({
  title: { type: String, required: true },
  statements: { type: [String], required: true, minlength: 5, maxlength: 9 },
  trueStatement: { type: String, required: true },
   
});
const userSchema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },
  grids: { type: [gridSchema], default: [] }
});

const User = mongoose.model('User', userSchema);



export default User;