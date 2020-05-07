import request from 'request'
import cheerio from 'cheerio'
import Database from './database/mysql.js'

request('https://cors-anywhere.herokuapp.com/https://finance.naver.com/item/main.nhn?code=005930',
    function (error, response, body) {
        if (error && response.statusCode !== 200) {
            console.log('error: ', error)
            console.log('statusCode: ', response && response.statusCode)
        }


        const $ = cheerio.load(body)

        console.log($('.no_today').find('.blind').text())

})

Database.connectDb()



// const connection = mysql.createConnection({
//     host: config.host,
//     user: config.user,
//     database: config.database,
//     password: config.password
// })

// connection.connect(err => {
//     if (err) {
//         console.log('error: ', err.stack)
//         return
//     }

//     console.log('connected as id ' + connection.threadId);
// })