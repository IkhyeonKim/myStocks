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
        
        this.connection.connect()

        console.log('Stock!')
    }

    end() {
        this.connection.end()
    }

    selectDb() {
        this.connection.query('SELECT * FROM tasks', function(error, results, fields){
            if(error) throw error;
            console.log('The solution is: ', results[0].solution)
        })
    }


})