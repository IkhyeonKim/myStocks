import path from 'path'
import express from 'express'
import mysql from 'mysql'
import * as config from './config.example.json'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR))
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

connection.connect()

connection.query('SELECT * FROM tasks', function(error, results, fields) {
    if(error){
        throw error;    
    }

    console.log(results)
})

connection.end
