const express = require('express');
const app = express();
const path = require('path');
const Product = require('./model/product.js');

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
mongo.connect('mongodb://127.0.0.1:27017/shopDatabase').then(
    ()=>{
        console.log('Connect Successful!');
    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: e`)
    }
)

class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

app.get('/product/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    let productWithID =  await Product.findById(id);
    if (!productWithID) {
        throw new AppError('Product not found', 404);
    }
    res.send('FINISH');
}))

app.get('*', (req, res)=> {
    res.send('404, you go to wrong page.')
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
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
    res.status(status).send(message);
})

app.listen(5050, ()=> {
    
})

