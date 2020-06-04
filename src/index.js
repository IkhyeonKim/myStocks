import axios from 'axios';
import Chart from 'chart.js'
import './style/main.scss'

const stockPoint = document.querySelector('#myStock');
const stockDate = []
const stockData = []

Number.prototype.formatComma = function(){
    if(this==0) return 0;
 
    let reg = /(^[+-]?\d+)(\d{3})/;
    let n = (this + '');
 
    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2')
    }

    return n;
};
 
String.prototype.formatComma = function(){
    let num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.formatComma();
};

String.prototype.formatDate = function() {
    return this.slice(-5)
}


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
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                callback: function(label, index, labels){
                                    return label.formatDate()
                                }
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                callback: function(label, index, labels){
                                    return label.formatComma()+'원'
                            }
                        }}
                    ]
                }
            }
        })

    }).catch( err => {
        console.log(err)
    })

    while (condition) {
        
    }

} 

let stock;

axios.get('/today-stock').then( (response) => {
        stock = response.data.stock;
        stockPoint.innerHTML = stock.formatComma() + '원';
    })
    .catch((err) => {
        console.log(err)
})



