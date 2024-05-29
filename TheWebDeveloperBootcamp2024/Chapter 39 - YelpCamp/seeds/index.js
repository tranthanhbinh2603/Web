const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('../seeds/cities');
const { places, descriptors} = require('../seeds/helper'); 
mongoose.connect('mongodb://127.0.0.1:27017/yelpCampDB').then(
    ()=>{
        
    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: e`)
    }
)

const randomInArray = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 1; i <= 5; i++) {    
        randomCity = randomInArray(cities);
        randomPlace = `${randomInArray(descriptors)} ${randomInArray(places)}`;
        const data = new Campground({
            location: `${randomCity.city}, ${randomCity.state}`, 
            title: randomPlace,
        });
        await data.save();
    }
}

seedDB();