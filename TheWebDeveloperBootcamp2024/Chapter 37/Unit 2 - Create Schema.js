const { default: mongoose } = require('mongoose');
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

const movieSchema = {
    title: String,
    year: Number,
    score: Number,
    rating: String
};

const movie = mongoose.model('Movie', movieSchema);
const newData = new movie({
    title: 'Stand by me',
    year: 2022,
    score: 9,
    rating: 'A+'
});