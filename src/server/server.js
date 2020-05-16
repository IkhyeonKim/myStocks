import path from 'path'
import express from 'express'
import DB from './db'
import axios from 'axios'
import cheerio from 'cheerio'
import util from './util'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const parsingURL = 'https://finance.naver.com/item/main.nhn?code=005930';

const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
const dotReg = new RegExp('\\.', 'g');

const PORT = process.env.PORT || 8000

app.use(express.static(DIST_DIR))

app.get('/', async (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/parsing', async (req, res) => {

    let stock;
    let date;
    let stockFromDb;

    await axios.get(parsingURL).then( response => {
        const parsedHtml = cheerio.load(response.data)
        const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
        
        date = parsedDate[0].replace(dotReg, '-')
        stock = parsedHtml('.no_today').find('.blind').text();
        stock = parseInt(stock.replace(',', ''));

    }).catch( err => {
        console.log(err)
    })

    try{
        stockFromDb = await DB.Stocks.select(date);
    }catch(e) {
        console.log(e)
        res.sendStatus(500)
    }

    if(stockFromDb.length === 0){

        try{
            let message = await DB.Stocks.insert(date, stock);
            res.send(message)
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }

    }else{

        if(stockFromDb[0].stock_price === stock){
            res.send({
                message: 'It is already stored.',
                stock: stock,
            })
        }else {

            try {
                let message = await DB.Stocks.update(date, stock)
                res.send(stock)
            } catch (error) {
                res.sendStatus(500);
            }    

        }
    }

})

app.get('/today-stock', async (req, res) => {

    let stock;
    let date;

    let today = new Date();
    let day = today.getDay()
    let dd = today.getDate(); 
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    dd -= util.isWeekend(day);
    dd = String(dd).padStart(2, '0');

    today = yyyy + '-' + mm + '-' + dd;
    
    try {
        stock = await DB.Stocks.select(today)
        res.send({
            stock: stock[0].stock_price
        })
    }catch(e) {
        console.log(e)
        res.sendStatus(500)
    }

    if(stock.length !== 0){

        res.send(stock[0].stock_price)

    }else {
        // Todo: 월요일 장 개시 이전에 대한 대응 필요
        // Todo: 파싱하는 부분 함수로 처리
        await axios.get(parsingURL).then( response => {
            const parsedHtml = cheerio.load(response.data)
            const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
            
            date = parsedDate[0].replace(dotReg, '-')
            stock = parsedHtml('.no_today').find('.blind').text();
            stock = parseInt(stock.replace(',', ''));
    
        }).catch( err => {
            console.log(err)
        })
    
        try{

            await DB.Stocks.insert(date, stock);
            res.send(stock)

        }catch(e){

            console.log(e);
            res.sendStatus(500);

        }
    }

})

app.get('/stocks', async (req, res) => {
    try {
        let stocks = await DB.Stocks.all();
        res.json(stocks);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})
