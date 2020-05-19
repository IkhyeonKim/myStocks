import path from 'path'
import express from 'express'
import DB from './db'
import util from './util'
import parsing from './parsing'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = process.env.PORT || 8000

app.use(express.static(DIST_DIR))

app.get('/', async (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/parsing', async (req, res) => {

    let stockFromDb;
    const todayStock = await parsing.parse('005930')

    try{
        stockFromDb = await DB.Stocks.select(todayStock.date);
    }catch(e) {
        console.log(e)
        res.sendStatus(500)
    }

    if(stockFromDb.length === 0){

        try{
            let message = await DB.Stocks.insert(todayStock.date, todayStock.stock);
            res.send(message)
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }

    }else{

        if(stockFromDb[0].stock_price === todayStock.stock){
            res.send({
                message: 'It is already stored.',
                stock: todayStock.stock,
            })
        }else {

            try {
                let message = await DB.Stocks.update(todayStock.date, todayStock.stock)
                res.send(todayStock.stock)
            } catch (error) {
                res.sendStatus(500);
            }    

        }
    }

})

app.get('/today-stock', async (req, res) => {

    let stock;

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
        
        if(stock.length !== 0){

            res.send({
                stock: stock[0].stock_price
            })
    
        }else {
            // Todo: 월요일 장 개시 이전에 대한 대응 필요
            const todayStock = await parsing.parse('005930')
    
            try{
    
                await DB.Stocks.insert(todayStock.date, todayStock.stock);
                res.send({
                    stock: todayStock.stock
                })
    
            }catch(e){
                console.log(e);
                res.sendStatus(500);
            }
        }


    }catch(e) {
        console.log(e)
        res.sendStatus(500)
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
