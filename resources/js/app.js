const cheerio = require('cheerio');
const axios = require('axios');

// import config from './config.json';
// import Database from '../database/mysql.js';
// const database = require('../database/mysql');

axios.get('https://cors-anywhere.herokuapp.com/https://finance.naver.com/item/main.nhn?code=005930')
    .then(function (response) {
        // console.log(response.data)
        const parsedHtml = cheerio.load(response.data)
        // console.log(parsedHtml)
        console.log(parsedHtml('.no_today').find('.blind').text());
    })
    .catch(function (err) {
        console.log(err)
    })

// Database.selectDb()
// Database.end()

// const connection = mysql.createConnection({
//     host: config.host,
//     user: config.user,
//     database: config.database,
//     password: config.password
// })

// connection.connect(err => {
//     if (err) {
//         console.log('error: ', err.stack)
//         return
//     }

//     console.log('connected as id ' + connection.threadId);
// })