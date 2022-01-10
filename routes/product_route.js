const express = require('express');
const router = express.Router();

const products = require('./../controllers/product');

router.get('/', products.get);
router.get('/:id', products.get_detail);
router.delete('/:id', products.delete);
router.post('/', products.create);
router.patch('/:id', products.update);

module.exports = router;