// importer mongoose
const mongoose = require('mongoose');

/*
*creer le schema d'une commande  
(les caracteristiques qu'une commande dans notre restaurant doit avoir )
*/
const ordersSchema =  new mongoose.Schema({
    userNameId:{type:String,required:true},
    clientId : {type:String,required:true},
    // le champ productId va stocker des ObjectId provenant de la relation 
    //entre  le schema order et le modele Products 
    productId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products"
    },
    subtotalPrice:{type:Number, required:true},
    totalPrice:{type:Number, required:true},
    // statut de la commande du client(en attente, preparation ou livrée,  )
    orderStatus:{type:String, default:"en attente"},
    paymentStatus:{type:String,required:true},
},{timestamps:true});

module.exports = mongoose.model("ordersModel",ordersSchema);
