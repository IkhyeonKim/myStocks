const cheerio = require('cheerio');
const axios = require('axios');

axios.get('https://cors-anywhere.herokuapp.com/https://finance.naver.com/item/main.nhn?code=005930')
    .then(function (response) {
        // console.log(response.data)
        const parsedHtml = cheerio.load(response.data)
        // console.log(parsedHtml)
        const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
        const dotReg = new RegExp('\\.', 'g');

        const stock = parsedHtml('.no_today').find('.blind').text();
        
        const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
        const date = parsedDate[0].replace(dotReg, '-')

        console.log(stock, date)
    })
    .catch(function (err) {
        console.log(err)
    })
