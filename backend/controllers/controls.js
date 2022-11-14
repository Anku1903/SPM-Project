const mongoose = require("mongoose")
const {user,fooditem, orderSchema} = require('../model/schema')
exports.register = (req,res) => {
    const {name,email,password,isowner,image} = req.body;

    const newfooduser = new user({
        name,
        email,
        password,
        isowner,
        image
    }).save((err,data) => {
    
        if(err) {
            res.json({result: 'server Error !'})
        }
        else{
            res.json({result: data})
        }
    })



}

exports.login = (req,res) => {
    const {email,password} = req.body;

const user = mongoose.model("user_foodie")
user.findOne({email},(err,data) =>{
    if(err){
        
        return res.json({result: "Database Error"})
    }
    if(!data){
        return res.json({result: "User does not exist"})
    }
    else{
        if(password!==data.password){
         
        return res.json({result: "Wrong password"})   
        }
        else{
            
        return res.json({result: "You're logged in.",userdata: data})
        }
    }

    

})

}


exports.restaurents = (req,res) => {
    const newShop = mongoose.model('user_foodie');
            newShop.find({isowner: "yes"},(err,data) => {
                
                if(err) {
                    console.log(err);
                    res.status(401).json({error: 'Database error'})
                }
                else{
                    res.json({restaurents: data})
                }
            })
}

exports.onerestora = (req,res) => {
    const id = req.params.id
    
    const newShop = mongoose.model('user_foodie');
            newShop.findOne({_id:id},(err,data) => {
                if(err) {
                    console.log(err);
                    res.status(401).json({error: 'Database error'})
                }
                else{
                    let objdata = {_id:data._id,name: data.name,logo: data.image}
                   return res.json({oneshop: objdata})
                }
            })
}


exports.finditems = (req,res) => {
    const {name} = req.body
    
    const newFood = mongoose.model('item_foodie');
    console.log(name)
            newFood.find({shopname:name},(err,data) => {
                if(err) {
                    console.log(err);
                    res.status(401).json({error: 'Database error'})
                }
                else{
                   return res.json({fooddata: data})
                }
            })
}

exports.findorder = (req,res) => {
    const {email} = req.body
    
    const findOrders = mongoose.model('order_foodie');
    
            findOrders.find({email},(err,data) => {
                if(err) {
                    console.log(err);
                    res.status(401).json({error: 'Database error'})
                }
                else{
                   return res.json({orderdata: data})
                }
            })
}

exports.delitems = (req,res) => {
    const {id} = req.body
    
    const newFood = mongoose.model('order_foodie');
    
            newFood.deleteOne({_id:id},(err,data) => {
                if(err) {
                    console.log(err);
                    res.status(401).json({error: 'Database error'})
                }
                else{
                   return res.json({msg: "item deleted"})
                }
            })
}


exports.additems = (req,res) => {
    const {name,price,shopname,image} = req.body
    
    const newfood = new fooditem({
        name,
        price,
        shopname,
        image
    }).save((err,data) => {
    
        if(err) {
            res.json({result: 'server Error !'})
        }
        else{
            res.json({result: data})
        }
            })
}


exports.order = (req,res) => {
    const {username,email,total,qty,items,address} = req.body
    
    const neworder = new orderSchema({
        username,
        email,
        total,
        qty,
        items,
        address
    }).save((err,data) => {
    
        if(err) {
            res.json({result: 'server Error !'})
        }
        else{
            res.json({result: data})
        }
            })
}