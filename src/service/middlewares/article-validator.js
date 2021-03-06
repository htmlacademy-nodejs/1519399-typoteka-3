const {HttpCode} = require(`../../constants`);

const articleKeys = [`title`, `createdDate`, `announce`, `fullText`, `category`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.filter((key) => !keys.includes(key));

  if (keysExists.length) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
