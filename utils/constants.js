const serverError = (res) => res.status(500)
  .send({ message: 'We have encountered an error' });

const userError = (res) => res.status(200)
  .send({ message: 'User ID not found' });

const pageError = (res) => res.status(404)
  .send({ message: 'Requested resource not found' });

const URL_REGEX = /https?:\/\/.*/gi;

module.exports = {
  serverError,
  userError,
  pageError,
  URL_REGEX,
};
