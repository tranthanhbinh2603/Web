const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const Product = require('./model/product.js');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

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

categories = ['vegetable', 'fruit', 'dairy'];

app.put('/product/:id', async (req, res) => {
    //Cấu trúc phải lưu
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/product/${product._id}`);
})

app.delete('/product/:id', async (req, res) => {
    //Cấu trúc phải lưu
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect(`/products`);
})

app.post('/product', async (req, res) => {
    //Cấu trúc phải lưu
    const data = new Product(req.body);
    await data.save();
    res.redirect(`/product/${data.id}`);
})

app.get('/products', async (req, res) => {
    let {category} = req.query;
    if (!category){
        let listProduct = await Product.find({});
        res.render('products', {listProduct, categories: 'All'});
    }
    else {
        let listProduct = await Product.find({category: category});
        res.render('products', {listProduct, categories});
    }
   
})

app.get('/product/new', (req, res) => {
    res.render('addProduct', {categories});
})

app.get('/product/:id', async (req, res) => {
    //Cấu trúc phải lưu
    const {id} = req.params;
    let productWithID = await Product.findById(id);
    res.render('product', {productWithID});
})

app.get('/product/:id/edit', async (req, res) => {
    //Cấu trúc phải lưu
    const {id} = req.params;
    let productWithID = await Product.findById(id);
    res.render('editProduct', {productWithID});
})



app.get('*', (req, res)=> {
    res.send('404, you go to wrong page.')
})

app.listen(5050, ()=> {
    
})