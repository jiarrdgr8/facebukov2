module.exports = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  if (req.params.email) {
    req.params.email = req.params.email.toLowerCase();
  }
  next();
};
