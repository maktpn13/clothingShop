const  mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
    email: String,
    image: String,
  

});
Userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', Userschema);