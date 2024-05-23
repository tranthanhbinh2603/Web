const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.set('views', path.join(__dirname) + '/views');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/comments', (req, rep) => {
    rep.render('viewComments', {comments})
})

app.get('/comment/add', (req, rep) => {
    rep.render('addComment', {comments})
})

app.post('/comment', (req, rep) => {
    const {username, comment} = req.body;
    comments.push({id: uuid(), username, comment});
    rep.redirect('/comments');    
})

// app.post('/', (req, rep) => {
//     console.log(req.body);
//     rep.send('Good')
// })



app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
})