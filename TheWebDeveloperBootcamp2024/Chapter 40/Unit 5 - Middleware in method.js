const express = require('express');
const app = express();

const verify = (req, res, next) => {
    if (req.query.id !== '123'){
        res.send('Query ID not vaild!!!!!');
    }
    next();
}

app.post('/abc', verify, (req, res)=> {
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
