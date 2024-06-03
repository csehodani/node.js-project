const express = require('express');
const mongoose = require('mongoose');
const { ServiceBroker } = require("moleculer");
const jwt = require('jsonwebtoken');

const createController = require('./controllers/userController.js');
const createUserRepository = require('./repositories/userRepository.js');
const createUserService = require('./services/userService.js');

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');

    const broker = new ServiceBroker({
      nodeID: "user-service",
      transporter: "TCP",
    });

    broker.start().then(async () => {
      console.log("ServiceBroker started");

      const userRepository = createUserRepository();
      const userService = createUserService(broker, userRepository);

      function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.sendStatus(401);

        jwt.verify(token, 'your_jwt_secret_here', (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
        });
      }

      app.use(authenticateToken);

      app.use('/', createController(broker, userService));

      app.listen(3001, () => {
        console.log('User service is running on port 3001');
      });
    }).catch(err => {
      console.error("Broker start failed", err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
