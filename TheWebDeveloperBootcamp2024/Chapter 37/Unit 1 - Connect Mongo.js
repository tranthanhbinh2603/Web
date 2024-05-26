const mongo = require('mongoose');
mongo.connect('mongodb://127.0.0.1:27017/mydatabase').then(
    ()=>{
        console.log('Connect Successful!');
    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: ${e}`)
    }
)