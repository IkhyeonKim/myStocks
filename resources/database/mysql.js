import mysql from 'mysql'
import * as config from './config.json'

// const express = require('express')

// const app = express();

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.listen('3000', () => {
//     console.log('Server started on port 3000')
// })


export default new (class Stocks {
    constructor() {
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            database: config.database,
            password: config.password
        })

        console.log('Stock!')
    }

    end() {
        this.connection.end()
    }

    connectDb() {
        this.connection.connect((err) => {
            if (err) {
                console.log('error: ', err.stack)
                return
            }

            console.log('connected as id ' + connection.threadId);
        })
    }


})