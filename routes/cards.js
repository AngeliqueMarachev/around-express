const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('../data/cards.json', { encoding: 'utf-8' })
    .then((cards) => {
      res.send(cards)
  })
  .catch(() => res.status(500).send({ message: "We have encountered an error" }));
});

module.exports = router;