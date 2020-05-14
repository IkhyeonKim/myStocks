import path from 'path'
import express from 'express'
import DB from './db'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/stocks', async (req, res) => {
    try {
        let stocks = await DB.Stocks.all();
        res.json(stocks);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})
