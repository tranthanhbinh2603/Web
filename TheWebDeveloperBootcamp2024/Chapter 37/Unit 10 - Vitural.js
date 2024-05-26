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

nameSchema.virtual('firstName').get(function () {
    console.log(`This is your first name: ${this.first}`);
}).set(function(first) {
    this.first = first;
});

const Name = mongoose.model('Name', nameSchema);

for (let i = 0; i < 10; i++) {
    const name = new Name({ first: `First ${i}`, last: `Last ${i}` });
    name.save();
}

async function find(){
    for (let i = 0; i < 10; i++) {
        let nameSelector = await Name.findOne({first: `First ${i}`});
        nameSelector.firstName;
    }
}

find();

