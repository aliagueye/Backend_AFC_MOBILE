// importer mongoose
const mongoose = require('mongoose');
/*
*creer le schema du produit 
(les caracteristiques qu'un produit dans notre boutique doitt avoir )
*/
const productSchema =  new mongoose.Schema({
    title:{type:String,required:true},
    supplier:{type:String,required:true},
    price:{type:String,required:true},
    imageUrl:{type:String,required:true},
    description:{type:String,required:true},
    product_points:{type:String,required:true},
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);
