'use strcit';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const getLBA = require('./libs/getlba');

const config = {
    channelSecret: process.env.LINE_SECRET || require('./config').channelSecret,
    channelAccessToken: process.env.LINE_TOKEN || require('./config').channelAccessToken
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

app.get('/', (req, res) => {
  res.send(`Node.js Version is ${process.versions.node}`);
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let mes = '';

  if(event.message.text === '応募件数'){
    const data = await getLBA();
    mes += `--AWARDSページから取得-- \n`;
    mes += `合計作品応募数: ${data.listCount} \n`;
    mes += `スキル作品応募数: ${data.skillCount} \n`;
    mes += `BOT作品応募数: ${data.botCount} \n`;
    mes += `スキル&BOT作品応募数: ${data.bothCount}`;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: mes
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);