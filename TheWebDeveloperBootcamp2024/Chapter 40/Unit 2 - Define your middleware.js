const express = require('express');
const app = express();

app.use((res, req, next) => {
    console.log('This call before next() (func middleware 1)')
    return next();
    console.log('This call after next() (func middleware 1)')
})
app.use((res, req, next) => {
    console.log('This call before next() (func middleware 2)')
    next();
    console.log('This call after next() (func middleware 2)')
})
app.use((res, req, next) => {
    console.log('This call in middleware func 3')
})


app.get('*', (req, res)=> {
    res.send('Helloooooooooooo')
})

app.listen(5050, ()=> {
    console.log('Finish start server');
})
