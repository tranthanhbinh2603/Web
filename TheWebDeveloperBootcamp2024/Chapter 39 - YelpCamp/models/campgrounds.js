const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelpCampDB').then(
    ()=>{

    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: e`)
    }
)

const Schema = mongoose.Schema;
const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});
const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;