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

export default {
    all
}