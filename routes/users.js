const router = require('express').Router();
const fs = require('fs').promises;

const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fs.readFile(DATA_PATH, { encoding: 'utf-8' })
    .then((data) => {
      const userData = JSON.parse(data);
      res.send(userData);
    })
    .catch(() => {
      res.status(500).send({ message: 'We have encountered an error' }); // respond server error
    });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(DATA_PATH, { encoding: 'utf-8' })
    .then((data) => {
      const { id } = req.params;
      const user = JSON.parse(data).find((u) => u._id === id); // find user by id

      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User ID not found' }); // user does not exist
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'We have encountered an error' }); // respond server error
    });
});

module.exports = router;
