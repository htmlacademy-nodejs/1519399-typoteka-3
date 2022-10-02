"use strict";

const express = require(`express`);
const request = require(`supertest`);
// const Sequelize = require(`sequelize`);

// const initDB = require(`../lib/init-db`);
// const passwordUtils = require(`../lib/password`);
const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

/* const mockCategories = [
  `Железо`,
  `Без рамки`,
  `Программирование`,
  `Разное`,
  `Кино`,
  `Психология`
  `IT`,
  `Природа`,
  `Космос`,
  `Человек`,
  `Музыка`,
  `Животные`,
  `Деревья`
];

const mockUsers = [
  {
    name: `Иван Иванов`,
    email: `ivanov@example.com`,
    passwordHash: passwordUtils.hashSync(`ivanov`),
    avatar: `avatar01.jpg`
  },
  {
    name: `Пётр Петров`,
    email: `petrov@example.com`,
    passwordHash: passwordUtils.hashSync(`petrov`),
    avatar: `avatar02.jpg`
  }
]; */

const mockArticles = [{
  id: `1`,
  title: `Учим HTML и CSS`,
  createdDate: `2022-08-09T00:57:04.256Z`,
  announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
  fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Задача организации, в особенности же новая модель организационной деятельности способствует подготовке и реализации форм воздействия. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Значимость этих проблем настолько очевидна, что консультация с профессионалами из IT способствует подготовке и реализации ключевых компонентов планируемого обновления. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей лишь добавляют фракционных разногласий и функционально разнесены на независимые элементы.`,
  category: [`Железо`, `Без рамки`],
  comments: [{
    id: `188455`,
    text: `Совсем немного... Согласен с автором! Хочу такую же футболку :-)`
  }, {
    id: `633356`,
    text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему?`
  }, {
    id: `335721`,
    text: `Хочу такую же футболку :-) Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`
  }, {
    id: `623973`,
    text: `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }]
}, {
  id: `2`,
  title: `Рок — это протест`,
  createdDate: `2022-05-24T07:55:44.840Z`,
  announce: `Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы.`,
  fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Задача организации, в особенности же новая модель организационной деятельности способствует подготовке и реализации форм воздействия. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Соображения высшего порядка, а также выбранный нами инновационный путь требует определения и уточнения модели развития. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта.`,
  category: [`Программирование`, `Разное`, `Кино`, `Психология`],
  comments: [{
    id: `922315`,
    text: `Совсем немного...`
  }]
}, {
  id: `3`,
  title: `Что такое золотое сечение`,
  createdDate: `2022-06-11T12:28:45.054Z`,
  announce: `Значимость этих проблем настолько очевидна, что консультация с профессионалами из IT способствует подготовке и реализации ключевых компонентов планируемого обновления. Он написал больше 30 хитов. Соображения высшего порядка, а также выбранный нами инновационный путь требует определения и уточнения модели развития. Как начать действовать? Для начала просто соберитесь. И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы.`,
  fullText: `Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Задача организации, в особенности же новая модель организационной деятельности способствует подготовке и реализации форм воздействия. И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы. Золотое сечение — соотношение двух величин, гармоническая пропорция. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов.`,
  category: [`Железо`, `Программирование`, `IT`, `Природа`, `Космос`],
  comments: [{
    id: `864130`,
    text: `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
  }, {
    id: `527684`,
    text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {
    id: `084166`,
    text: `Согласен с автором! Мне кажется или я уже читал это где-то?`
  }]
}, {
  id: `4`,
  title: `Библия – книга, которую чаще всего воруют в американских магазинах`,
  createdDate: `2022-06-08T08:35:26.874Z`,
  announce: `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Как начать действовать? Для начала просто соберитесь. Соображения высшего порядка, а также выбранный нами инновационный путь требует определения и уточнения модели развития.`,
  fullText: `Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Следует отметить, что синтетическое тестирование способствует повышению качества дальнейших направлений развития. Простые ежедневные упражнения помогут достичь успеха. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году.`,
  category: [`Разное`, `IT`],
  comments: [{
    id: `735108`,
    text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
  }, {
    id: `803908`,
    text: `Мне кажется или я уже читал это где-то?`
  }, {
    id: `072858`,
    text: `Плюсую, но слишком много буквы! Это где ж такие красоты? Совсем немного...`
  }]
}, {
  id: `5`,
  title: `Саудовская Аравия не содержит рек`,
  createdDate: `2022-06-28T03:20:22.009Z`,
  announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Соображения высшего порядка, а также выбранный нами инновационный путь требует определения и уточнения модели развития. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  fullText: `И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы. Как принято считать, элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, разоблачены. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Он написал больше 30 хитов.`,
  category: [`Разное`, `IT`, `Человек`, `Музыка`, `Животные`, `Без рамки`, `Железо`, `Природа`, `Космос`, `Кино`, `Психология`, `Деревья`],
  comments: [{
    id: `076303`,
    text: `Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?`
  }, {
    id: `695503`,
    text: `Согласен с автором!`
  }]}];

const createAPI = async () => {
  // const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  // await initDB(mockDB, {categories: mockCategories, offers: mockArticles, users: mockUsers});
  const app = express();
  app.use(express.json());
  article(app, new DataService(mockArticles), new CommentService(mockArticles));
  return app;
};


describe(`API returns a list of all articles`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's title equals "Учим HTML и CSS"`, () => expect(response.body[0].title).toBe(`Учим HTML и CSS`));

});

describe(`API returns an article with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Учим HTML и CSS"`, () => expect(response.body.title).toBe(`Учим HTML и CSS`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    id: `6`,
    title: `Рок — это протест`,
    createdDate: `2022-06-28T03:20:22.009Z`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Следует отметить, что синтетическое тестирование способствует повышению качества дальнейших направлений развития. Простые ежедневные упражнения помогут достичь успеха. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году.`,
    category: [`Железо`, `Программирование`],
    comments: [],
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    id: `2`,
    title: `Рок — это протест","createdDate":"2022-05-24T07:55:44.840Z`,
    createdDate: `2022-06-28T03:20:22.009Z`,
    fullText: `Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Следует отметить, что синтетическое тестирование способствует повышению качества дальнейших направлений развития. Простые ежедневные упражнения помогут достичь успеха. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году.`,
    category: [1, 2],
    comments: [],
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  /* test(`When field type is wrong response code is 400`, async () => {
    const badArticles = [
      {...newArticle, id: true},
      {...newArticle, announce: 12345},
      {...newArticle, categories: `Котики`}
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  }); */

  test(`When field value is wrong response code is 400`, async () => {
    const badArticles = [
      {...newArticle, id: -1},
      {...newArticle, title: `too short`},
      {...newArticle, categories: []}
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    id: `2`,
    title: `Рок — это протест`,
    createdDate: `2022-06-28T03:20:22.009Z`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы. Как принято считать, элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, разоблачены. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Он написал больше 30 хитов.`,
    category: [`Борьба с прокрастинацией`, `Программирование`],
    comments: [],
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/2`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/2`)
    .expect((res) => expect(res.body.title).toBe(`Рок — это протест`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, async () => {

  const app = await createAPI();

  const validArticle = {
    id: `2`,
    title: `Рок — это протест`,
    createdDate: `2022-05-24T07:55:44.840Z`,
    announce: `Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Задача организации, в особенности же новая модель организационной деятельности способствует подготовке и реализации форм воздействия. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Соображения высшего порядка, а также выбранный нами инновационный путь требует определения и уточнения модели развития. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта.`,
    category: [`Программирование`, `Разное`, `Кино`, `Психология`],
    comments: [{
      id: `922315`,
      text: `Совсем немного...`
    }]
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, async () => {

  const app = await createAPI();

  const invalidArticle = {
    id: 9836,
    title: `Рок`,
    createdDate: `2022-06-28T03:20:22.009Z`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `И нет сомнений, что реплицированные с зарубежных источников, современные исследования своевременно верифицированы. Как принято считать, элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, разоблачены. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации системы масштабного изменения ряда параметров. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от дальнейших направлений развития проекта. Дорогие друзья, новая модель организационной деятельности обеспечивает актуальность модели развития. Он написал больше 30 хитов.`,
    comments: [],
  };

  return request(app)
    .put(`/articles/20`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/1`);
    console.log(response.body);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/20`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/3/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's text is "Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!"`,
      () => expect(response.body[0].text).toBe(`Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этих полей`,
    id: `1`
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/3/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/3/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {

  const app = await createAPI();

  return request(app)
    .post(`/articles/20/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {

  const invalidComment = {};

  const app = await createAPI();

  return request(app)
    .post(`/articles/2/comments`)
    .send(invalidComment)
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/1/comments/633356`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/articles/1/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent comment`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/4/comments/100`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/20/comments/1`)
    .expect(HttpCode.NOT_FOUND);

});
