const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, supplierController.list);
router.get('/create', ensureAuth, supplierController.createForm);
router.post('/create', ensureAuth, supplierController.create);
router.get('/edit/:id', ensureAuth, supplierController.editForm);
router.post('/edit/:id', ensureAuth, supplierController.update);
router.get('/delete/:id', ensureAuth, supplierController.delete);

module.exports = router;
