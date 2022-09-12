const SERVER_ERROR = (res) => res.status(500).send({ message: 'We have encountered an error' });

const PAGE_ERROR = (res) => res.status(404).send({ message: 'Requested resource not found' });

const INVALID_DATA = (res) => res.status(400).send({ message: 'Invalid data' });

module.exports = {
  SERVER_ERROR,
  PAGE_ERROR,
  INVALID_DATA,
};
