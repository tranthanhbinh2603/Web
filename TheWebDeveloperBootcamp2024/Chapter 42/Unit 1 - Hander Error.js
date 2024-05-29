const express = require('express');
const app = express();

const verify = (req, res, next) => {
    if (req.query.id !== '123'){
        throw new Error('Query ID not vaild!!!!!');
    }
    next();
}

app.post('/abc', verify, (req, res)=> {
    res.send('This is POST method, abc');
})

app.post('/def', (req, res) => {
    res.send('This is POST method, def')
})

app.get('/error', (req, res) => {
    chicken.haha();
})

app.use((err, req, res, next) => {
    console.log('ERROR FOUND!')
    console.log('URL Client Request:', req.ip);
    console.log('Method:', req.method);
    console.log('Url:', req.originalUrl);
    console.log('Status:', res.statusCode);
    console.log('Res:', res.getHeader('Content-Length'));
    console.log('Response time:', res.getHeader('X-Response-Time'));
    console.log('User-agent:', req.get('User-Agent'));
    console.log('Error: ', err)
    console.log('===========================');
    res.status(500).send('Error');
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})


app.listen(5050, ()=> {
    console.log('Finish start server');
    console.log('===========================')
})