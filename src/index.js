import cheerio from 'cheerio';
import axios from 'axios';

const stockPoint = document.querySelector('#myStock');

let stock;

axios.get('/today-stock').then( (response) => {
        stock = response.data.stock;
        stockPoint.innerHTML = stock;
    })
    .catch((err) => {
        console.log(err)
})


axios.get('/stocks').then( res => {
    console.log(res.data)
}).catch( err => {
    console.log(err)
})

