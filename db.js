// desestructuración {}
import {createPool} from 'mysql2/promise'; 

export const conn = createPool({
    host: 'localhost',
    user: 'ingeweb',
    password: '12345',
    port: 3306,
    database: 'users'
});