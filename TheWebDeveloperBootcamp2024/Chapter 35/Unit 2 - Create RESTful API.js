const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
});

app.get('/comment/:id', (req, rep) => {
    const {id}= req.params;
    let comment = comments.find(c => c.id == id);
    rep.render('viewComment', {comment}) 
})

app.patch('/comment/:id', (req, rep) => {
    const {id}= req.params;
    const {commentEdit} = req.body;
    let comment = comments.find(c => c.id == id);
    comment.comment = commentEdit;
    rep.redirect('/comments');    
})

app.get('/comment/:id/edit', (req, rep) => {
    const {id}= req.params;
    let comment = comments.find(c => c.id == id);
    rep.render('editComment', {comment}) 
})

app.delete('/comment/:id', (req, rep) => {
    const {id}= req.params;
    comments = comments.filter(c => c.id !== id);
    rep.redirect('/comments');    
})

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
})