// desestructuración {}
import {createPool} from 'mysql2/promise'; 

export const conn = createPool({
    host: 'localhost',
    user: 'IngeWeb',
    password: 'yare1610$',
    database: 'users'
});