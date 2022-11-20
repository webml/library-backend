const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  addBook,
  deleteBook,
  deleteUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:user_id", getUser);
router.post("/users", createUser);
router.patch("/users/:user_id/addBook/:book_id", addBook);
router.patch("/users/:user_id/deleteBook/:book_id", deleteBook);
router.delete("/users/:user_id", deleteUser);

module.exports = router;
