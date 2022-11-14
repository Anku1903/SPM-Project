const mongoose = require('mongoose');
const Userschema = new mongoose.Schema({
    name: {type: String,required:true},
    email: {type:String,required: true,unique: true},
    password: {type:String,required: true},
    isowner: {type: String,required:true},
    image: {type: String,required: true}


},{timestamps: true})


const foodSchema = new mongoose.Schema({
    name: {type: String,required: true},
    price: {type: String,required: true},
    shopname: {type: String,required: true},
    image: {type: String,required: true},
})


const orderSchema = new mongoose.Schema({
    username: {type: String,required: true},
    email: {type: String,required: true},
    total: {type: String,required: true},
    qty: {type: String,required: true},
    address: {type: String,required: true},
    status: {type: String,required: true,default: "Pending"},
    items: {type: Array,required: true}
})


// const Shopschema = new mongoose.Schema({
//     name: {type: String,required:true},
//     rating: {type:String,required: true},
//     category: {type:Array,required: true},
//     logo: {type:String,required: true}
// })

exports.fooditem = mongoose.model('item_foodie',foodSchema);

exports.user = mongoose.model('user_foodie',Userschema);

exports.orderSchema = mongoose.model('order_foodie',orderSchema);


// exports.restora = mongoose.model('FoodShop',Shopschema);