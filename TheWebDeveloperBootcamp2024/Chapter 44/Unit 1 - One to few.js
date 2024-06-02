const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/SQLRelationship")
  .then(() => {})
  .catch((e) => {
    console.log("Error when connect");
    console.log(`This is error: e`);
  });

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  addresses: [
    {
      street: String,
      province: String,
    },
  ],
});
const user = mongoose.model("DB_User", userSchema);

const createUser = async () => {
  const u = new user({
    name: "Binh",
  });
  u.addresses.push({
    street: "To 3 ap 1",
    province: "Dong Nai",
  });
  u.addresses.push({
    street: "To 4 ap 2",
    province: "Dong Nai",
  });
  await u
    .save()
    .then(() => {
      console.log("Create Successful");
    })
    .catch((e) => {
      console.log("Error when connect");
      console.log(`This is error: e`);
    });
};

const addAddress = async (id) => {
  let result = await user.findById(id);
  result.addresses.push({
    street: "To 10 ap 9",
    province: "Dong Nai",
  });
  await result
    .save()
    .then(() => {
      console.log("Add Successful");
    })
    .catch((e) => {
      console.log("Error when add");
      console.log(`This is error: e`);
    });
};
// createUser();
addAddress("665adcded0d0d48bf3eec93b");
