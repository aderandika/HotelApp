const router = require('express').Router();
// export admin controller yang akan digunakan 
const adminController = require('../controller/adminController');

router.get('/dashboard', adminController.viewDashboard);
router.get('/category', adminController.viewCategory);
// Meyimpan data category
router.post('/category', adminController.addCategory);
// Edit category
router.put('/category', adminController.editCategory);
router.get('/bank', adminController.viewBank);
router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);

module.exports = router;