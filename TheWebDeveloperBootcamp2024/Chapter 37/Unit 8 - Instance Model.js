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

movieSchema.methods.editYear = async function(year) {
    this.year = year;
    await this.save();
}

movieSchema.methods.togglePremiere = async function() {
    this.isPremiere = !this.isPremiere;
    await this.save();
}

movieSchema.methods.addCategory = async function(category) {
    this.categories.push(category);
    await this.save();
}


const movie = mongoose.model('Movie', movieSchema);

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

const editFilm = async () => {
    let movieChoosing = await movie.findOne({title: 'The Iron Giant'});
    await console.log(movieChoosing);
    await movieChoosing.togglePremiere();
    await console.log(movieChoosing);
    await movieChoosing.editYear(2010);
    await console.log(movieChoosing);
    await movieChoosing.addCategory("Romanic");
    await console.log(movieChoosing);
}

editFilm();