// importer mongoose
const mongoose = require('mongoose');

/*
*creer le schema de notre panier  
(les caracteristiques qu'un panier  dans notre restaurant doit avoir )
*/
const cartSchema =  new mongoose.Schema({
    userNameId:{type:String,required:true},
    // representation de la liste des articles qui seront dans le panier 
    // ces articles proviennent de notre table de produit dans la base de donnée
    products:[
        {
            cartItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products"
            },
            quantity:{type:Number,default:1}
        }
    ]
},{timestamps:true});

module.exports = mongoose.model("cartModels",cartSchema);
