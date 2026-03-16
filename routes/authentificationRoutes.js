const router = require('express').Router();
const authentificationControllers = require('../controllers/authentificationControllers');

router.post('/sinscrire', authentificationControllers.createUser)
router.post('/seConnecter', authentificationControllers.loginUser)

module.exports = router;