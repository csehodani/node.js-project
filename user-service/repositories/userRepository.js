const User = require('../models/user');

function createUserRepository() {
  return {
    async list() {
      return User.find();
    },
    async create(username, email) {
      const newUser = new User({ username, email });
      return newUser.save();
    },
    async findById(id) {
      return User.findById(id);
    },
    async update(id, username, email) {
      return User.findByIdAndUpdate(id, { username, email }, { new: true });
    },
    async remove(id) {
      return User.findByIdAndDelete(id);
    },
    async listAddresses(userId) {
      const user = await User.findById(userId);
      if (!user) return [];
      return user.addresses;
    },
    async createAddress(userId, street) {
      const user = await User.findById(userId);
      if (!user) return null;
      user.addresses.push({ street });
      await user.save();
      return user.addresses[user.addresses.length - 1];
    },
    async updateAddress(userId, addressId, street) {
      const user = await User.findById(userId);
      if (!user) return null;
      const address = user.addresses.id(addressId);
      if (!address) return null;
      address.street = street;
      await user.save();
      return address;
    },
    async removeAddress(userId, addressId) {
      const user = await User.findById(userId);
      if (!user) return null;
      const address = user.addresses.id(addressId);
      if (!address) return null;
      address.deleteOne();
      await user.save();
      return { message: `Address with ID ${addressId} has been deleted for user with ID ${userId}` };
    },
  };
}

module.exports = createUserRepository;
