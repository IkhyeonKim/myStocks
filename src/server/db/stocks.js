import { Connection } from './index'

export const all = async () => {
    return new Promise((resolve, rejects) => {
        Connection.query('SELECT * FROM myStocks', (err, results) => {
            if(err){
                return rejects(err)
            }

            resolve(results);
        });
    });
}

export const insert = async (date, stock, _stockCode, _stockName) => {
    let stockCode = _stockCode || '5930';
    let stockName = _stockName || '삼성전자'

    return new Promise((resolve, rejects) => {
        Connection.query(`INSERT INTO myStocks VALUES( "${date}", "${stock}", "${stockCode}", "${stockName}", null )`, (err, results) => {
            if(err) return rejects(err)

            resolve(results)
        });
    })
}

export const select = async (date, ...params) => {

    return new Promise( (resolve, rejects) => {
        Connection.query(`SELECT * FROM myStocks WHERE date='${date}'`, (err, results) => {
            if(err) return rejects(err)

            resolve(results)
        })
    })
}

export const update = async (date, stock) => {
    return new Promise( (resolve, rejects) => {
        Connection.query(`UPDATE myStocks SET stock_price=${stock} WHERE date='${date}'`, (err, results) => {
            if(err) return rejects(err)

            resolve(results)
        })
    })
}

export default {
    all, insert, select, update
}