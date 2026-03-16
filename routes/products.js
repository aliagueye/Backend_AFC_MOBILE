const router = require('express').Router();
const productController = require('../controllers/productsControllers');

router.get('/',productController.getAllProduct);
router.get('/:id',productController.getProduct);
router.get('/search/:key',productController.searchProduct);
router.post('/',productController.createProduct);
router.delete('/:id',productController.deleteProduct);
router.patch('/:id',productController.updateProduct)
module.exports = router