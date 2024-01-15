import {createPool} from 'mysql2/promise'; 

export const conn = createPool({

    host: 'localhost',
    user: 'root',
    password: 'sapo123',
    port: 3306,
    database: 'users'
});