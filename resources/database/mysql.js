const mysql = require('mysql');
const config = require('./config.json');

// const express = require('express')

// const app = express();
// const port = 8000;

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + './public/index.html')
// })

// app.listen(port, () => {
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