const express = require('express')
const app = express()

app.listen(5050, ()=> {
    console.log('Tôi đang lắng nghe ở cổng 5050');    
})

app.get('/search', (req, res)=> {
    const {q: query, color} = req.query;
    const html = `
    <html>
      <head>
        <style>
          body {
            background-color: ${color};
          }
        </style>
      </head>
      <body>
        <p>Kết quả tìm kiếm cho từ khoá ${query}</p>
      </body>
    </html>
  `;
  res.send(html);
})

//Luôn đặt cái này cuối cùng

app.get('*', (req, res)=> {
    res.send('Tôi không hiểu bạn gọi vậy vì sao????')
})