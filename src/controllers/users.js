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
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        response.status(404).send(`User with id:${user_id} not found`);
      }
      response.status(200).send(user);
    })
    .catch((err) => {
      response.status(404).send(`User with id:${user_id} not found`);
    });
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

const addBook = (request, response) => {
  const { user_id, book_id } = request.params;
  User.updateOne({ _id: user_id }, { $addToSet: { books: book_id } })
    .then((user) => {
      if (!user) {
        response.status(404).send(`User with id:${user_id} not found`);
      }
      response.status(200).send(user);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const deleteBook = (request, response) => {
  const { user_id, book_id } = request.params;
  User.updateOne({ _id: user_id }, { $pullAll: { books: [{ _id: book_id }] } })
    .then((user) => {
      if (!user) {
        response.status(404).send(`User with id:${user_id} not found`);
      }
      response.status(200).send(user);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  User.deleteOne({ _id: user_id })
    .then((user) => {
      if (!user) {
        response.status(404).send(`User with id:${user_id} not found`);
      }
      response.status(200).send("Done");
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  addBook,
  deleteBook,
  deleteUser,
};
