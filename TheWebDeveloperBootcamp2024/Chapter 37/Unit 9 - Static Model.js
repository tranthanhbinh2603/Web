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

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
    categories: [String],
    isPremiere: Boolean
});

movieSchema.statics.getLargeScore = async function() {
    return await this.find({score: {$gte: 8.0}});
}

const movie = mongoose.model('Movie', movieSchema);

movie.getLargeScore()
     .then((films) => {
       console.log(films);
     })
     .catch((error) => {
       console.error(error);
     });

// movie.insertMany([
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R', categories: [], isPremiere: true},
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R', categories: [], isPremiere: true },
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG', categories: [], isPremiere: true },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R', categories: [], isPremiere: true },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13', categories: [], isPremiere: true }
// ])
//     .then(data => {
//         console.log("IT WORKED!");
//     }).catch(e=> {
//         console.log("NOT WORK!!!!")
//         console.log(e);
//     })