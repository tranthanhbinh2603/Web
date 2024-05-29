const express = require('express')
const app = express()

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');
    
})

app.use((req, res)=> {
    console.log('Bạn đang GET tôi!!!!')
    res.send('<h1>I am good, thanks you for visit!</h1>')
})