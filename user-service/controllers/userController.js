const express = require('express');

function createController(broker) {
  const router = express.Router();

  router.get('/users', async (req, res) => {
    try {
      const users = await broker.call('user.list');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/users', async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = await broker.call('user.create', { username, email });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await broker.call('user.get', { id });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updatedUser = await broker.call('user.update', { id, username, email });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await broker.call('user.remove', { id });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/users/:id/addresses', async (req, res) => {
    try {
      const { id } = req.params;
      const addresses = await broker.call('user.listAddresses', { id });
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/users/:id/addresses', async (req, res) => {
    try {
      const { id } = req.params;
      const { street } = req.body;
      const newAddress = await broker.call('user.createAddress', { id, street });
      res.json(newAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/users/:id/addresses/:addressId', async (req, res) => {
    try {
      const { id, addressId } = req.params;
      const { street } = req.body;
      const updatedAddress = await broker.call('user.updateAddress', { id, addressId, street });
      res.json(updatedAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/users/:id/addresses/:addressId', async (req, res) => {
    try {
      const { id, addressId } = req.params;
      const result = await broker.call('user.removeAddress', { id, addressId });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createController;
