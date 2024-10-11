// import model category 
const Category = require('../models/Category');

// render view dashboard
module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "HotelApp | Dashboard"
        });
    }, 
    viewCategory: async (req, res) => {
        try {
            // read category
            const category = await Category.find();
            // alert
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/category/view_category', { 
                category, 
                alert, 
                title: "HotelApp | Category"
            });
        } catch (error) {
            res.redirect('/admin/category');
        }
        
    }, 
    addCategory: async (req, res) => {
        // Handle error message
        try {
            // cara buat supaya bisa input data
            const { name } = req.body;
            // create category
            await Category.create({ name });
            // alert
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success');
            // redirect ke halaman category setelah berhasil
            res.redirect('/admin/category');
        } catch (error) {
             // alert
             req.flash('alertMessage', `$error.message`);
             req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
       
    },
    editCategory: async (req, res) => {
        try {
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            category.name = name; 
            await category.save();
            // alert
            req.flash('alertMessage', 'Success Update Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
             // alert
             req.flash('alertMessage', `$error.message`);
             req.flash('alertStatus', 'danger');
             res.redirect('/admin/category');
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params; 
            const category = await Category.findOne({ _id: id });
            await category.deleteOne();
            // alert
            req.flash('alertMessage', 'Success Delete Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            // alert
            req.flash('alertMessage', `$error.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
        
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank', {
            title: "HotelApp | Bank"
        });
    }, 
    viewItem: (req, res) => {
        res.render('admin/item/view_item', {
            title: "HotelApp | Item"
        });
    }, 
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "HotelApp | Booking"
        });
    }
}