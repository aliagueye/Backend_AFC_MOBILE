const Product = require('../models/Products')

const productControllers ={
    createProduct:async(req,res)=>{
        //  fonction pour créer  un produit dans notre base de données MongoDB à l'aide de Mongoose
        //const newProduct = new Product(req.body);
        try{
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json({ message: "Product created successfully", product: newProduct })
        }catch(err){
            console.error("Failed to create the product:", err);
            res.status(500).json({ message: "Failed to create the product" });
        }
    },
    //  fonction pour reccupperer tous les produit dans notre base de données MongoDB à l'aide de Mongoose
    getAllProduct: async(req,res)=>{
        try {
            const product = await Product.find().sort({createdAt:1})
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("failled to get the products") 
        }
    },
    //  fonction avoir un produit avec son id  dans notre base de données MongoDB à l'aide de Mongoose
    getProduct:async(req,res)=>{
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("failled to get the products")   
        }
    },
    //fonction pour rechercher un produit dans notre base de données MongoDB à l'aide de Mongoose

    searchProduct:async(req,res)=>{
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "afcmobile2",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      } 
                    }
                  ]
            )
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json("failled to get the products")   

        }
    },
    //  fonction pour supprimer un produit dans notre base de données MongoDB à l'aide de Mongoose
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                // Si le produit n'est pas trouvé, renvoie une erreur 404
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            // En cas d'erreur, renvoie une réponse avec le statut 500
            res.status(500).json({ message: "Failed to delete the product" });
        }
    },
    //  fonction pour mettre à jour un produit dans notre base de données MongoDB à l'aide de Mongoose
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const updateData = req.body; // Les données à mettre à jour
            // Utilise findByIdAndUpdate pour trouver le produit par son ID et le mettre à jour avec les nouvelles données
            const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Failed to update the product" });
        }
    }
};

module.exports = productControllers;