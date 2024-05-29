const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');

app.get('/q/:subreddit', (req, rep) => {
    const {subreddit}= req.params;
    const data = redditData[subreddit];
    if (data) {
        rep.render('subredditv2.ejs', {...data}); 
    }
    else {
        rep.send('<h1>404. Not found subreddit.</h1>')
    }
    
})

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
})