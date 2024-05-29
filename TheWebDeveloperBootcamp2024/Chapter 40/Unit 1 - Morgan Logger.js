//install: npm i morgan
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('URL Client Reuquest: :remote-addr\nMethod: :method\nUrl: :url\nStatus: :status\nRes: :res[content-length]\nResponse time: :response-time ms\nUser-agent: :user-agent\n==========================='));

app.get('*', (req, res)=> {
    res.send('Helloooooooooooo')
})

app.listen(5050, ()=> {
    console.log('Finish start server');
})
