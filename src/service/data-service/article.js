'use strict';

const {customAlphabet} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: customAlphabet(`1234567890`, MAX_ID_LENGTH)(), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles.find((item) => item.id === id);

    if (oldArticle) {
      return Object.assign(oldArticle, article);
    }

    return oldArticle;
  }
}

module.exports = ArticleService;
