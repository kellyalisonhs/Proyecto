import {conn} from './db.js';

export const getAllUsers = (req, res)=>{
    const strSql = 'select * from user';    
    const [result] =  conn.query(strSql);  // callback
    return result;     
 };