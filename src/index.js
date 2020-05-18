import axios from 'axios';
import Chart from 'chart.js'

const stockPoint = document.querySelector('#myStock');
const stockDate = []
const stockData = []

window.onload = () => {
    const chart = document.querySelector('#stock-chart');

    axios.get('/stocks').then( res => {
        res.data.forEach( elem => {
            stockDate.push(elem.date)
            stockData.push(elem.stock_price)
        });

        console.log(stockData, stockDate)

        const stockChart = new Chart(chart, {
            type: 'line',
            data: {
                labels: stockDate,
                datasets: [{
                    data: stockData
                }]
            }
        })

    }).catch( err => {
        console.log(err)
    })

} 

let stock;

axios.get('/today-stock').then( (response) => {
        stock = response.data.stock;
        stockPoint.innerHTML = stock;
    })
    .catch((err) => {
        console.log(err)
})



