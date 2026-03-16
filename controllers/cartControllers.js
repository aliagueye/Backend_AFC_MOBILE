//importation du modèle de produit et de panier 
const Product = require('./../models/Products') ;
const Cart = require('./../models/cartModels') ;

const cartControllers = {
    // fonction pour ajouter un produit a notre panier 
    addToCart: async(req,res)=>{
        const {userId,cartItem,quantity} = req.body;
        try {
            // récuperer le panier du client 
            const cart = await Cart.findOne({userId})
            if(cart){
                // on verifie si les produit souhaité sont deja dans le panier
                const wishProduct = cart.products.find(
                    (product)=>product.cartItem.toString()=== cartItem
                );
                //si oui on incremente sinon on l'ajoute au panier 
                if(wishProduct){
                    wishProduct.quantity++;
                }else{
                    cart.products.push({cartItem,quantity})
                }
                // sauvegagrder dans la database
                await cart.save();
                res.status(201).json({ message: "Produit ajouté avec succés "})
            }else{
                const newCart = new Cart({
                    userId,
                    products:[{
                        cartItem,
                        quantity:quantity
                    }]
                });
                // sauvegagrder dans la database
                await newCart.save();
                res.status(201).json({ message: "Produit ajouté avec succés "})
            }


        } catch (error) {
            res.status(500).json({ message: "echec de l'ajout dans le panier " });
        }
    },
    // fonction pour supprimer un produit de notre panier 
    deleteToCart: async(req,res)=>{

    },
    // fonction pour récuperer notre panier 
    getCart: async(req,res)=>{
        try {
            // méthode populate de mongoose remplit les champs lié à cartItem
        const cart = await Cart.find({userId}).populate(
            'products.cartItem',"_id title supplier price imageUrl");
        } catch (error) {
            
        }
        
    },
    // fonction pour diminuer la quantité de produit dans le panier 
    decrementCartItem: async(req,res)=>{

    },
}
module.exports = cartControllers;