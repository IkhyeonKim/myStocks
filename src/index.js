import cheerio from 'cheerio';
import axios from 'axios';

const stockPoint = document.querySelector('#myStock');

let stock;
let date;

axios.get('/parsing').then( (response) => {
        stock = response.data;
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

