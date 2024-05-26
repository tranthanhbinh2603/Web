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

// movie.updateMany({score: {$lte: 8.0}}, {score: 8.0}).then((result) => {
//     console.log("UPDATE SUCESSFUL");
// })

movie.findOneAndUpdate({score: {$gte: 8.0}}, {score: 8.0}, {new: true, runValidators: true}).then(()=>{
    console.log('Finish')
}).catch((e)=>{
    console.log(e);
})