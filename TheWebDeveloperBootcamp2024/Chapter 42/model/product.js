const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopDatabase').then(
    ()=>{

    }
).catch(
    (e) => {
        console.log('Error when connect');
        console.log(`This is error: e`)
    }
)

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ['vegetable', 'fruit', 'dairy'],
    }
});
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
