// import model category 
const Category = require('../models/Category');

// render view dashboard
module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard');
    }, 
    viewCategory: async (req, res) => {
        // read category
        const category = await Category.find();
        // console.log(category);
        res.render('admin/category/view_category', { category });
    }, 
    addCategory: async (req, res) => {
        // cara buat supaya bisa input data
        const { name } = req.body;
        // console.log(name);
        // create category
        await Category.create({ name });
        // redirect ke halaman category setelah berhasil
        res.redirect('/admin/category');
    },
    editCategory: async (req, res) => {
        const { id, name } = req.body;
        const category = await Category.findOne({ _id: id });
        category.name = name; 
        await category.save();
        res.redirect('/admin/category');
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank');
    }, 
    viewItem: (req, res) => {
        res.render('admin/item/view_item');
    }, 
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking');
    }
}