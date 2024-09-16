const bodyParser = require('body-parser');

const rawBodyParser = bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
});

module.exports = rawBodyParser;