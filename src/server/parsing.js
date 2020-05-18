import axios from 'axios'
import cheerio from 'cheerio'

const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
const dotReg = new RegExp('\\.', 'g');

export const parse = async (__stockCode) => {
    const stockCode = __stockCode || '005930';
    const url = 'https://finance.naver.com/item/main.nhn?code=';
    
    const todayStock = {
        date: '',
        stock: 0,
    }

    await axios.get(url + stockCode).then( response => {
        const parsedHtml = cheerio.load(response.data)

        let date = dateReg.exec(parsedHtml('#time').find('.date').text())
        todayStock.date = date[0].replace(dotReg, '-')


        let stock = parsedHtml('.no_today').find('.blind').text();
        todayStock.stock = parseInt(stock.replace(',', ''))

    }).catch( err => {
        console.log(err)
    })

    return todayStock
}

export default {
    parse
}