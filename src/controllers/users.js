const User = require("../models/user");

const getUsers = (request, response) => {
  User.find({})
    .then((user) => {
      response.status(200).send(user);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  response.status(200);
  response.send(`User with id: ${user_id}`);
};

const createUser = (request, response) => {
  const data = request.body;
  User.create(data)
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  const data = request.body;
  User.findByIdAndUpdate(
    user_id,
    data,
    { $addToSet: { books: book_id } },
    { $pullAll: { books: [{ _id: book_id }] } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      request.status(200).send(user);
    })
    .catch((err) => {
      request.status(500).send(err.message);
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  User.filterByIdAndDelete(user_id)
    .then((user) => {
      request.status(200).send("Done");
    })
    .catch((err) => {
      request.status(500).send(err.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
