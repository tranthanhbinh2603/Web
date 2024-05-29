const express = require('express');
const app = express();

app.use((req, res, next)=>{
    req.method = 'GET';
    next();
})

app.post('/abc', (req, res)=> {
    res.send('This is POST method');
})

app.get('/abc', (req, res)=> {
    res.send('This is GET method');
})

app.get('*', (req, res)=> {
    
})

app.listen(5050, ()=> {
    console.log('Finish start server');
})