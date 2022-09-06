const Card = require("../models/cards");
const { serverError } = require("../utils/constants");

// GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => serverError(res));
};

// POST
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
  .then(() => {
    res.status(200).send("Card has been created");
  })
  .catch(() => {
    serverError(res);
  });
};

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.user._id;
  Card.findByIdAndRemove(cardId)
    .then(() => {
      res.status(200).send("Card has been deleted");
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
