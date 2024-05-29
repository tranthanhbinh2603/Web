const express = require('express')
const app = express()

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
})

app.get('/1', (req, res)=> {
    res.send('À, bạn đang gọi /1')
})

app.get('/2', (req, res)=> {
    res.send('À, bạn đang gọi /2')
})

app.get('/', (req, res)=> {
    res.send('À, bạn đang gọi trang chủ (/)')
})

//Luôn đặt cái này cuối cùng

app.get('*', (req, res)=> {
    res.send('Tôi không hiểu bạn gọi vậy vì sao????')
})