const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')
const Campground = require('./models/campgrounds')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({}); 
    res.render('campground/campgrounds', {campgrounds})
})

app.post('/campground', async (req, res) => {
    const data = new Campground(req.body);
    await data.save();
    res.redirect(`/campground/${data._id}`);
})

app.get('/campground/new', (req, res) => {
    res.render('campground/addCampground')
})

app.get('/campground/:id', async (req, res) => {  
    const campground = await Campground.findById(req.params.id); 
    res.render('campground/campground', {campground})
})

app.get('/campground/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id); 
    res.render('campground/editCampground', {campground});
})

app.put('/campground/:id', async (req, res) => {  
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }); 
    res.redirect(`/campground/${campground._id}`);
})

app.delete('/campground/:id', async (req, res) => {  
    const campground = await Campground.findByIdAndDelete(req.params.id); 
    res.redirect(`/campgrounds`);
})

app.get('*', (req, res)=> {
    res.send('It not seems goood!!!!')
})

app.listen(5050, ()=> {
    console.log('Finish start server');
})