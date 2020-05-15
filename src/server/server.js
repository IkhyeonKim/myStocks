import path from 'path'
import express from 'express'
import DB from './db'
import axios from 'axios'
import cheerio from 'cheerio'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR))

app.get('/', async (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/parsing', async (req, res) => {
    const parsingURL = 'https://finance.naver.com/item/main.nhn?code=005930';
    let stock;
    await axios.get(parsingURL).then( response => {
        const parsedHtml = cheerio.load(response.data)
        stock = parsedHtml('.no_today').find('.blind').text();
    }).catch( err => {
        console.log(err)
    })

    res.send(stock)
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
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})
