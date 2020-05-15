import cheerio from 'cheerio';
import axios from 'axios';

const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
const dotReg = new RegExp('\\.', 'g');

const stockPoint = document.querySelector('#myStock');

let stock;
let date;

axios.get('/parsing').then( (response) => {

        stock = response.data;
        stockPoint.innerHTML = stock;

        // const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
        // date = parsedDate[0].replace(dotReg, '-')

        // console.log(stock, date)
    })
    .catch((err) => {
        console.log(err)
})


axios.get('/stocks').then( res => {
    console.log(res.data)
}).catch( err => {
    console.log(err)
})

