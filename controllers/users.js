const User = require("../models/users");
const { serverError, userError } = require("../utils/constants");

const getUsers = (req, res) => {
  User.find({}) // no specific prompt
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => serverError(res));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId); // findById gives one user
  orFail(() => {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send("Invalid user");
      } else if (err.type === 404) {
        res.status(404).send({ message: err.message });
      } else {
        serverError(res);
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
      } else {
        serverError(res);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
