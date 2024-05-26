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

const filmSchema = {
    title: {
        type: String,
        required: true
    },
    year: Number,
    score: {
        type: Number
    },
    typefilm: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        minlength: 20,
    }
};

const movie = mongoose.model('Film', filmSchema);

movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, typefilm: ['Romatic', "Fiction"], description: "Hi, this is description"}
]).then(data => {
    console.log("IT WORKED!");
}).catch(e=> {
    console.log("NOT WORK!!!!")
    console.log(e);
})

// Một ví dụ khác
// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         maxlength: 20
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: [0, 'Price must be positive ya dodo!']
//     },
//     onSale: {
//         type: Boolean,
//         default: false
//     },
//     categories: [String],
//     qty: {
//         online: {
//             type: Number,
//             default: 0
//         },
//         inStore: {
//             type: Number,
//             default: 0
//         }
//     },
//     size: {
//         type: String,
//         enum: ['S', 'M', 'L']
//     }

// });