const router = require('express').Router();
const userControllers = require('../controllers/userControllers');

router.get('/:id', userControllers.getUser)
router.delete('/:id', userControllers.deleteUser)

module.exports = router;