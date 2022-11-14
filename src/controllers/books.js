const Book = require("../models/book");

const getBooks = (request, response) => {
  Book.find({})
    .then((book) => {
      response.status(200).send(book);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  response.status(200);
  response.send(`User with id: ${book_id}`);
};

const createBook = (request, response) => {
  const data = request.body;
  Book.create(data)
    .then((book) => {
      response.status(201).send(book);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  const data = request.body;
  Book.findByIdAndUpdate(book_id, data, { new: true, runValidators: true })
    .then((book) => {
      request.status(200).send(book);
    })
    .catch((err) => {
      request.status(500).send(err.message);
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  Book.filterByIdAndDelete(book_id)
    .then((book) => {
      request.status(200).send("Done");
    })
    .catch((err) => {
      request.status(500).send(err.message);
    });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
