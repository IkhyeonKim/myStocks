import path from 'path'
import express from 'express'
import DB from './db'
import axios from 'axios'
import cheerio from 'cheerio'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = process.env.PORT || 8000

app.use(express.static(DIST_DIR))

app.get('/', async (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/parsing', async (req, res) => {
    const parsingURL = 'https://finance.naver.com/item/main.nhn?code=005930';

    const dateReg = new RegExp('[0-9]{4}\.[0-9]{2}\.[0-9]{2}')
    const dotReg = new RegExp('\\.', 'g');

    let stock;
    let date;

    await axios.get(parsingURL).then( response => {
        const parsedHtml = cheerio.load(response.data)
        const parsedDate = dateReg.exec(parsedHtml('#time').find('.date').text());
        
        date = parsedDate[0].replace(dotReg, '-')
        stock = parsedHtml('.no_today').find('.blind').text();
        stock = stock.replace(',', '');

    }).catch( err => {
        console.log(err)
    })

    try{
        let message = await DB.Stocks.insert(date, stock);
        res.send(message)
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }

    // res.send(date)
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
