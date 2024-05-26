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

const nameSchema = new mongoose.Schema({
    first: String,
    last: String
});

nameSchema.pre('save', async function () {
    this.first = 'Hacked';
    console.log('Chạy trước khi save');
})
nameSchema.post('save', async function () {
    console.log('Chạy sau khi save');
})

const Name = mongoose.model('Name', nameSchema);

for (let i = 0; i < 3; i++) {
    const name = new Name({ first: `First ${i}`, last: `Last ${i}` });
    name.save();
}