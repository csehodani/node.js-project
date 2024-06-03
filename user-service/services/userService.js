async function create(ctx, userRepository) {
  try {
    const { username, email } = ctx.params;
    const newUser = await userRepository.create(username, email);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
}

function createUserService(broker, userRepository) {
  return broker.createService({
    name: "user",
    actions: {
      async list(ctx) {
        try {
          const users = await userRepository.list();
          return users;
        } catch (error) {
          throw new Error("Failed to fetch users.");
        }
      },
      async create(ctx) {
        try {
          const { username, email } = ctx.params;
          const newUser = await userRepository.create(username, email);
          return newUser;
        } catch (error) {
          throw new Error("Failed to create user.");
        }
      },
      async get(ctx) {
        try {
          const { id } = ctx.params;
          const user = await userRepository.findById(id);
          if (!user) {
            throw new Error("User not found.");
          }
          return user;
        } catch (error) {
          throw new Error("Failed to fetch user.");
        }
      },
      async update(ctx) {
        try {
          const { id, username, email } = ctx.params;
          const updatedUser = await userRepository.update(id, username, email);
          return updatedUser;
        } catch (error) {
          throw new Error("Failed to update user.");
        }
      },
      async remove(ctx) {
        try {
          const { id } = ctx.params;
          const result = await userRepository.remove(id);
          return result;
        } catch (error) {
          throw new Error("Failed to delete user.");
        }
      },
      async listAddresses(ctx) {
        try {
          const { id } = ctx.params;
          const addresses = await userRepository.listAddresses(id);
          return addresses;
        } catch (error) {
          throw new Error("Failed to fetch addresses.");
        }
      },
      async createAddress(ctx) {
        try {
          const { id, street } = ctx.params;
          const newAddress = await userRepository.createAddress(id, street);
          return newAddress;
        } catch (error) {
          throw new Error("Failed to create address.");
        }
      },
      async updateAddress(ctx) {
        try {
          const { id, addressId, street } = ctx.params;
          const updatedAddress = await userRepository.updateAddress(id, addressId, street);
          return updatedAddress;
        } catch (error) {
          throw new Error("Failed to update address.");
        }
      },
      async removeAddress(ctx) {
        try {
          const { id, addressId } = ctx.params;
          const result = await userRepository.removeAddress(id, addressId);
          return result;
        } catch (error) {
          throw new Error("Failed to delete address.");
        }
      },
    },
  });
}

module.exports = createUserService;
