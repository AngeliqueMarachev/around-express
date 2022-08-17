const router = require('express').Router();
const fs = require('fs').promises;

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('../data/users.json', { encoding: "utf-8" }) // read users fs promise
    .then((users) => {
      const data = JSON.parse(users);
      const user = data.find((user) => user._id === id); // find user by id

      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "User ID not found" }); // user does not exist
      }
    })
    .catch(() =>
      res.status(500).send({ message: "We have encountered an error" })
    ); // respond server error
});

router.get("/", (req, res) => {
  res.status(200).send({ data: [] });
});

// router.get("/:id", (req, res) => {
//   req.params.id;
//   res.send({ message: "User ID not found" });
// });

module.exports = router;
