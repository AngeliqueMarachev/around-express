const Card = require('../models/cards');
const { SERVER_ERROR, INVALID_DATA, PAGE_ERROR } = require('../utils/constants');

// GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => SERVER_ERROR(res));
};

// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;

  Card.create({
    name, link, likes, owner,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        SERVER_ERROR(res);
      }
    });
};

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error({ message: 'Card not found' });
      error.status = 404;

      throw error;
    })
    .then((card) => res.status(200).send({ message: 'Card has been deleted', data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'Invalid card ID' });
      } else if (err.status === 404) {
        res.status(PAGE_ERROR).send({ message: err.message });
      } else {
        SERVER_ERROR(res);
      }
    });
};

const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { [operator]: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error({ message: 'Card is not found' });
      error.status = 404;

      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: 'Card id is incorrect' });
      } else if (err.status === 404) {
        res.status(PAGE_ERROR).send({ message: err.message });
      } else {
        SERVER_ERROR(res);
      }
    });
};

const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLikes(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
