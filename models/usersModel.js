// importer mongoose
const mongoose = require('mongoose');

/*
*creer le schema d'un utilisateura l'aide de mongoose   
(definit les données    qu'un utilisateur de notre restaurant doit avoir )
*/
const usersSchema =  new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true}, // un seul email par user
    password:{type:String, required:true},
    
},{timestamps:true});

module.exports = mongoose.model("usersModel",usersSchema);
