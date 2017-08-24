'use strict';

require('dotenv').config({ path: '../' });
const request = require('request');

// Globals
const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1';
const GROUPME_URL = 'https://api.groupme.com/v3/bots/post';
const bot_id = process.env.BOT_ID;
let triviaInProgress = false;

module.exports = {
  question: () => {
    questionHandler();
  }
};

const questionHandler = () => {
  if (triviaInProgress === false) {
    triviaInProgress = true;
    getTriviaQuestion()
      .then((triviaObj) => {
        postToGM(triviaObj.question);

        setTimeout(() => {
          postToGM(`The correct answer is: ${triviaObj.answer}`);
          triviaInProgress = false;
        }, 69000);
      })
  } else if (triviaInProgress === true) {
    postToGM('A trivia question is already in progress.');
  }
};

const getTriviaQuestion = () => {
  return new Promise((resolve, reject) => {
    request.get(TRIVIA_URL, (err, res, body) => {
      body = JSON.parse(body);
      if (err) {
        reject(err);
      }
      resolve({
        question: body.results[0].question,
        answer: body.results[0].correct_answer,
      });
    });
  });
};

const formatPostForGM = (text) => {
  let finalResponseObject = {
    bot_id,
    text
  };
  return JSON.stringify(finalResponseObject);
};

const postToGM = (text) => {
  let payload = formatPostForGM(text);
  console.log(payload);
  request.post(GROUPME_URL).form(payload);
};
