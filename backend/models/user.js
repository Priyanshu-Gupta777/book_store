const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username : { type:String, required : true},
    email :  { type:String, required : true, unique: true},
    password :  { type:String, required : true},
    address :  { type:String, required : true},
    avatar :  { type:String, default : 'https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-96392.jpg?size=626&ext=jpg&ga=GA1.1.2117048058.1727968147&semt=ais_hybrid'},
    role : {type : String, default : 'user', enum : ['user','admin']},
    favourites : [{type : mongoose.Types.ObjectId, ref : 'books'},],
    cart : [{type : mongoose.Types.ObjectId, ref : 'books'},],
    order : [{type : mongoose.Types.ObjectId, ref : 'order'},],

}, {timestamps : true});

module.exports = mongoose.model('user', user);