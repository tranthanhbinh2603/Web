const express = require('express');
const app = express();

app.use('/abc', (req, res, next)=>{
    req.method = 'POST';
    next();
})

app.post('/abc', (req, res)=> {
    res.send('This is POST method, abc');
})

app.post('/def', (req, res) => {
    res.send('This is POST method, def')
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})

app.listen(5050, ()=> {
    console.log('Finish start server');
})
