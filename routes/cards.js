const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {
  fs.readFile(DATA_PATH, { encoding: 'utf-8' })
    .then((cards) => {
      const cardData = JSON.parse(cards);
      res.send(cardData);
    })
    .catch(() => res.status(500).send({ message: 'We have encountered an error' }));
});

module.exports = router;
