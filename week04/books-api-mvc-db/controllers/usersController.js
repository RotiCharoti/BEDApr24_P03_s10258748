const Users = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await Users.getUserById(userId); // Corrected from `User` to `Users`
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user");
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const createdUser = await Users.createUser(newUser); // Corrected from `Book` to `Users`
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const newUserData = req.body;

  try {
    const updatedUser = await Users.updateUser(userId, newUserData); // Corrected from `User.updateBook` to `Users.updateUser`
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id); // Corrected variable name from `userIdId` to `userId`

  try {
    const success = await Users.deleteUser(userId); // Corrected from `User` to `Users`
    if (!success) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

const searchUsers = async (req, res) => {
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  try {
    const users = await Users.searchUsers(searchTerm); // Corrected from `User` to `Users`
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
};
