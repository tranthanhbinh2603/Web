const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');

app.get('/', (req, rep) => {
    let listCats = ['Nut', 'Catty', 'Mun', 'Min'];
    rep.render('loop.ejs', {listCats}); 
})

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
}) 