'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [`title`, `createdDate`, `announce`, `fullText`, `category`, `comments`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.filter((key) => !keys.includes(key));

  if (keysExists.length) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
