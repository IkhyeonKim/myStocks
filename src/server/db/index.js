import mysql from 'mysql'
import * as config from './config.example.json'

import Stocks from './stocks'

export const Connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

Connection.connect( err => {
    if(err) console.log(err)
})

export default {
    Stocks
}