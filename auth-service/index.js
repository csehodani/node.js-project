const express = require('express');
const authRoutes = require('./authRoutes');
const authenticateToken = require('./authMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'You accessed a protected route', user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
