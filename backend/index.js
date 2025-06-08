import express from 'express';
const app = express();
const port = process.env.PORT || 3000; 

app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});