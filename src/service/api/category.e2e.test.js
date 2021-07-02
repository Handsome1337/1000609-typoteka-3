'use strict';

const express = require(`express`);
const request = require(`supertest`);

const {HttpCode} = require(`../../constants`);
const category = require(`./category`);
const DataService = require(`../data-service/category`);

const mockData = [
  {
    id: `ytIv-u`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-04-17 06:12:08`,
    announce: `Для начала просто соберитесь. Он написал больше 30 хитов. Освоить вёрстку несложно.`,
    fullText: `Маленькими шагами. Игры и программирование разные вещи. Он написал больше 30 хитов. Не стоит идти в программисты, если вам нравятся только игры. Так ли это на самом деле? Процессор заслуживает особого внимания. Ёлки — это не просто красивое дерево. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Рок-музыка всегда ассоциировалась с протестами. Просто действуйте. Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов.`,
    category: [`Музыка`, `Деревья`, `Кино`, `Железо`, `Разное`, `IT`, `За жизнь`, `Без рамки`, `Программирование`],
    comments: [
      {
        id: `XyMMtP`,
        text: `Плюсую, но слишком много буквы! Согласен с автором!`
      }, {
        id: `gKr_-8`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Согласен с автором!`,
      }, {
        id: `GoqZ4A`,
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Согласен с автором! Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`,
      }
    ]
  }, {
    id: `bSqwws`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `2021-04-18 22:02:25`,
    announce: `Альбом стал настоящим открытием года. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    fullText: `Из под его пера вышло 8 платиновых альбомов.`,
    category: [`IT`, `За жизнь`, `Железо`, `Деревья`, `Кино`],
    comments: []
  }, {
    id: `B_7Q2v`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-06-22 14:23:46`,
    announce: `Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Для начала просто соберитесь. Как начать действовать? Игры и программирование разные вещи.`,
    fullText: `Как начать действовать? Это прочная древесина. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Так ли это на самом деле? Первая большая ёлка была установлена только в 1938 году. Для начала просто соберитесь. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Просто действуйте. Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`],
    comments: [
      {
        id: `Iih0v8`,
        text: `Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`,
      }, {
        id: `Od1NTM`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`,
      }
    ]
  }, {
    id: `YS76dB`,
    title: `Как собрать камни бесконечности`,
    createdDate: `2021-06-17 19:30:19`,
    announce: `Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Просто действуйте. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Альбом стал настоящим открытием года. Первая большая ёлка была установлена только в 1938 году. Рок-музыка всегда ассоциировалась с протестами. Игры и программирование разные вещи. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Этот смартфон — настоящая находка. Вы можете достичь всего. Как начать действовать? Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Просто действуйте. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Процессор заслуживает особого внимания. Собрать камни бесконечности легко, если вы прирожденный герой. Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов. Освоить вёрстку несложно. Так ли это на самом деле? Бороться с прокрастинацией несложно. Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    category: [`Программирование`, `Без рамки`, `За жизнь`, `Железо`],
    comments: [
      {
        id: `JeIgZn`,
        text: `Согласен с автором! Планируете записать видосик на эту тему?`,
      }, {
        id: `2xo2vF`,
        text: `Плюсую, но слишком много буквы! Согласен с автором!`
      }
    ]
  }, {
    id: `Ix6Nw-`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-06-26 00:48:11`,
    announce: `Это один из лучших рок-музыкантов. Так ли это на самом деле? Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего.`,
    fullText: `Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Ёлки — это не просто красивое дерево. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов.`,
    category: [`Кино`, `Музыка`],
    comments: [
      {
        id: `WaCUE8`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Хочу такую же футболку :-) Согласен с автором! Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`,
      }, {
        id: `PIEZ_g`,
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`
      }
    ]
  }
];

const createAPI = (data = mockData) => {
  const app = express();
  app.use(express.json());
  category(app, new DataService(data));
  return app;
};

describe(`Category`, () => {
  describe(`API returns category list`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/categories`);
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Content-Type application/json`, () => expect(response.type).toBe(`application/json`));
    test(`Returns list of 9 categories`, () => expect(response.body.length).toBe(9));
    test(`Category names are Деревья, За жизнь, Без рамки, Разное, IT, Музыка, Кино, Программирование, Железо`, () => {
      expect(response.body).toEqual(
          expect.arrayContaining([`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT`, `Музыка`, `Кино`, `Программирование`, `Железо`])
      );
    });
  });

  describe(`API handles the situation when the are no posts`, () => {
    const mockEmptyData = [];
    const api = createAPI(mockEmptyData);
    let response;

    beforeAll(async () => {
      response = await request(api)
        .get(`/categories`);
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Returns an empty list`, () => expect(response.body).toEqual([]));
  });
});
