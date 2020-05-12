const cheerio = require('cheerio');
const axios = require('axios');

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
