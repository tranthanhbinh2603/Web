const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');

app.get('/q/:subreddit', (req, rep) => {
    const randomNumber= Math.floor(Math.random()*(10-1+1))+1;
    rep.render('randomTemplate.ejs', {randomNumber}); 
})

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
}) 