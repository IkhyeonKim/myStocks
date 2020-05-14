import cheerio from 'cheerio';
import axios from 'axios';

const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
const dotReg = new RegExp('\\.', 'g');

let stock;
let date;

axios.get('https://cors-anywhere.herokuapp.com/https://finance.naver.com/item/main.nhn?code=005930')
    .then(function (response) {
        // console.log(response.data)
        const parsedHtml = cheerio.load(response.data)
        // console.log(parsedHtml)


        stock = parsedHtml('.no_today').find('.blind').text();
        
        const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
        date = parsedDate[0].replace(dotReg, '-')

        console.log(stock, date)
    })
    .catch(function (err) {
        console.log(err)
})

axios.get('/stocks').then( res => {
    console.log(res)
}).catch( err => {
    console.log(err)
})

