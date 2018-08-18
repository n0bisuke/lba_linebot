'use strcit';

const axios = require('axios');
const BASE_URL = `https://www.line-community.me/awards/json/works?count=1000`; // トークンURL

const main = async () =>{
    console.log('hogehoge');
    try {
        const res = await axios.request(BASE_URL);
        const items = res.data;
        let skillCount = 0; //スキル作品数
        let botCount = 0; //BOT作品数
        let bothCount = 0; //BOTとスキル両方を使った作品数
        let len = items.length; //配列の長さ
        for (let i = 0; i < len; i++) {
            if(items[i].hasSkill) skillCount++;
            if(items[i].hasBot) botCount++; 
            if(items[i].hasSkill && items[i].hasBot) bothCount++;
        }

        console.log(len, skillCount, botCount, bothCount);

        // console.log(items.length); //取得件数
        // console.log(items[0].listCount); //取得件数(API)
        return {
            listCount: len,
            skillCount: skillCount,
            botCount: botCount,
            bothCount: bothCount,
        };
    } catch (error) {
       console.log(error);
    }
}

module.exports = main;