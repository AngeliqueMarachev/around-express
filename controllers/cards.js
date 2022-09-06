const Card = require("../models/cards");
const { serverError } = require("../utils/constants");

// GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => serverError(res));
};

// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, likes, owner })
    .then((card) => res.status(201).send({ data: card }))
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

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.user._id;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('User not found')
      error.status = 404

      throw error
    })
    .then((card) =>
      res.status(200).send({ message: "Card has been deleted", data: card }))
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
