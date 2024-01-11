import {createPool} from 'mysql2/promise'; 

export const conn = createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'users'
});