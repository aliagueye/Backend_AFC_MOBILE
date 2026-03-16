// importation de nootre modele d'utilisateur
const userModel = require('../models/usersModel');

const userController = {
    // pour supprimer un utilisateur de notre base de donnée
    deleteUser: async(req,res)=>{
        try {
            // rechercher Id du user et le supprimer 
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Suppression réussi")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // Reccuperer un User avec son Id dans notre base de donnée
    getUser: async(req,res)=>{
        try {
            // rechercher Id du user  
            const user = await userModel.findById(req.params.id);
            if(!userModel){
                res.status(401).json("cet utlisateur n'existe pas")
            }
            // appliquer filtre sur les données à retourner 
            const {password,__v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    },
}
module.exports = userController;