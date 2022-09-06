const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

// const fs = require('fs').promises;
// const path = require('path');

// const DATA_PATH = path.join(__dirname, '../data/cards.json');

// const { serverError } = require('../utils/constants');

// router.get('/cards', (req, res) => {
//   fs.readFile(DATA_PATH, { encoding: 'utf-8' })
//     .then((cards) => {
//       const cardData = JSON.parse(cards);
//       res.send(cardData);
//     })
//     .catch(() => serverError(res));
// });

module.exports = router;
