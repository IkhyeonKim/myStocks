import axios from 'axios';
import Chart from 'chart.js'
import './style/main.scss'

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
                    data: stockData,
                    'label': '삼성전자',
                    borderColor: '#273896',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scale: {
                    ticks: {
                        max: 48800,
                        min: 47800,
                        stepSize: 200
                    }
                }
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



