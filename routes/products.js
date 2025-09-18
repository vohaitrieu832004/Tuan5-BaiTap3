const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuth } = require('../middleware/auth');

router.get('/', productController.list);
router.get('/create', ensureAuth, productController.createForm);
router.post('/create', ensureAuth, productController.create);
router.get('/edit/:id', ensureAuth, productController.editForm);
router.post('/edit/:id', ensureAuth, productController.update);
router.get('/delete/:id', ensureAuth, productController.delete);

module.exports = router;
