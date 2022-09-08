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

const updateLikes = (req, res, operator) => {
  const cardId = req.params.cardId
  const userId = req.user._id

  Card.findByIdAndUpdate(
    cardId, // searches for the card on the database
    { [operator]: { likes: userId } }, // $pull / $addToSet
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card is not found')
      error.status = 404

      throw error
    })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card id is incorrect' })
      } else if (err.status === 404) {
        res.status(404).send({ message: 'Invalid user id' })
      } else {
        res.status(500).send({ message: 'Something went wrong' })
      }
    })
};

const likeCard = (req, res) => updateLikes(req, res, $addToSet);

const dislikeCard = (req, res) => updateLikes(req, res, $pull);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
