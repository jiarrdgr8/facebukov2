const bodyParser = require("body-parser");

const rawBodyParser = bodyParser.json({
  verify: (req: any, res: any, buf: any) => {
    req.rawBody = buf;
  },
});

module.exports = rawBodyParser;
