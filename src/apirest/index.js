import express from 'express';

import {conn} from './src/model/db.js'; 

const PORT = 5000;
const app = express();

/*app.get("/allUsers",(req, res)=>{  
   const result=getAllUsers();
    
});*/
app.listen(PORT,()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);  
});   

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
//GET
app.get('/allUsers',async(req,res)=>{
    const [rows]=await conn.query('select *from user');
    res.json(rows)
    res.json({"msg":"ok"})
})

//POST
app.post('/postUsers',async(req,res)=>{

    const {name_u,email_u,passwd_u,type_u,question_u,answer_u}=req.body;
    console.log (name_u, email_u);
    await conn.query('INSERT INTO user(name_u,email_u,passwd_u,type_u,question_u,answer_u)VALUES(?,?,?,?,?,?)',[name_u,email_u,passwd_u,type_u,question_u,answer_u]);
    //console.log(req.body);    
    res.send('dato enviado')
 
})

// PUT
app.put('/',async (req,res) => {

});
    
    // DELETE
    app.delete('/eliminar', async (req, res) => {
        const userId = req.params.id;
        try {
            await conn.query('DELETE FROM user WHERE id = ?', [userId]);
            res.json({ msg: `Usuario con ID ${userId} eliminado` });
        } catch (error) {
            console.error('Error al eliminar usuario:', error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });