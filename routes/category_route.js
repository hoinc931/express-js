const express = require('express');
const router = express.Router();

const category_controller = require('./../controllers/category')

router.get('/', category_controller.get);
router.get('/:id', category_controller.get_detail);
router.post('/', category_controller.create);
router.delete('/:id', category_controller.delete);
router.patch('/:id', category_controller.update);


module.exports = router;