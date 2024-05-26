const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
mongo.connect('mongodb://127.0.0.1:27017/mydatabase').then(
    ()=>{
        console.log('Connect Successful!');
    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: e`)
    }
)

const movieSchema = {
    title: String,
    year: Number,
    score: Number,
    rating: String
};

const movie = mongoose.model('Movie', movieSchema);

movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then(data => {
        console.log("IT WORKED!");
    }).catch(e=> {
        console.log("NOT WORK!!!!")
        console.log(e);
    })