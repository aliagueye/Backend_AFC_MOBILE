// importation de nootre modele d'utilisateur
const userModel = require('../models/usersModel');
/*
 * crypto-js qu'on va utiliser pour chiffrer ou dechiffrer 
 * les mots de passe avant de les transmettre ou reccuperer dans la BD
 */ 
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


// implémentation de notre modele d'authentification 
const authentificationControllers = {
    // pour creer un nouveau utilisateur
    createUser:async(req,res) => {
        const newUser = new userModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            // chiffrement du password avec l'algorithme cryptographique AES
            // avec PASS_PHRASE defini dans notre fichier .env
            password:CryptoJS.AES.encrypt(req.body.password, 
                process.env.PASS_PHRASE).toString(),
        });
        //Sauvegarder le nouveau user dans notre base de donnée et 
        //gerer les erreurs de création 
        try {
            await newUser.save();
            res.status(201).json({message:"Utilisateur creéer avec succés"})
        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    // pour connecter un utilisateur déja existant
    loginUser:async(req,res) => {
        try {
           // rechercher dans notre base de donnée son email(unique par user)
           const user = await userModel.findOne({email:req.body.email});
           // cas ou aucun utilisateur a été trouvé
           if(!user){
            return res.status(401).json("echec, utilisateur inconnu entrez un mail valide");
           }
           //déchiffrer le password en UTF-8 si l'utilisateur existe
           const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_PHRASE);
           const result = decryptedPassword.toString(CryptoJS.enc.Utf8);
           // verifier la correspondance et envoyé error 401 si ca ne correspond pas 
           if(result!==req.body.password){
            return res.status(401).json("mauvais mot de passe");
           }
           // token signé  qui va contenir les données qu'on va envoyer au client
           const userToken = jwt.sign(
            {
                id:user.id
            }, process.env.JWT_SEC, {expiresIn:"7d"}
           );
           // appliquer un systeme de filtre surr les données a renvoyés 
           const {password,__v, createdAt, updatedAt, ...userData} = user._doc;
           res.status(201).json({...userData, token:userToken})
        } catch (error) {
            res.status(500).json({message:error})
        }

    },
};

module.exports = authentificationControllers;