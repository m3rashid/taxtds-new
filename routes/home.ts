// const router = require('express').Router();
// const _ = require('lodash');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const session = require('express-session');

// const User = require('../models/user');
// const Service = require('../models/service');
// const email = require('../config/nodemailer');

// router.post('/admin/advertise', (req, res) => {
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const companyName = req.body.name;
//     const query = req.body.query;
//     console.log(email, phone, companyName, query)
//     const admin = {
//         username: process.env.ADMIN_EMAIL,
//         data: {
//             email: email,
//             phone: phone,
//             companyName: companyName,
//             query: query
//         }
//     }
//     email(admin, 'quoteToAdmin.ejs', 'Someone asked for quote');
//     req.flash('success', 'Your request for quote was sent to the admin');
//     res.redirect('back');
// })

// let sessions;
// router.post('/adminLogin', (req, res) => {
//     if(req.body.username == process.env.ADMIN_USERNAME && req.body.password == process.env.ADMIN_PASSWORD){
//         sessions = req.session;
//         sessions.userid = req.body.username;
//         req.flash('success', 'Successfully authenticated as an admin of Tax TDS');
//         return res.redirect('/admin');
//     }
//     else{
//         req.flash('failure', 'Admin username or Admin password wrong');
//         return res.redirect('/');
//     }
// });

// let allUsers = [];
// let services = [];
// router.get('/admin', async (req, res) => {
//     if(!sessions){
//         req.flash('failure', 'session not set as admin');
//         return res.redirect('/');
//     }
//     else if(sessions.userid){
//         req.flash('success', 'successfully logged in as admin');
//         try{
//             allUsers = await User.find({})
//             services = await Service.find({})
//         }
//         catch(err){
//             console.log(err);
//             req.flash('failure', 'There was an error accessing the database. try again')
//         }

//         return res.render('admin.ejs', {
//             titleTop: 'Tax TDS | Admin',
//             allUsers: allUsers,
//             services: services
//         });
//     }
//     else{
//         req.flash('failure', 'An error occured, Admin not found');
//         return res.redirect('/');
//     }
// });

// function getAdmin(){
//     if(sessions == null || sessions == undefined) return false;
//     else if(sessions.userid) return true;
//     else return false;
// }

// router.get('/adminLogout', (req, res) => {
//     sessions = undefined;
//     req.flash('success', 'Successfully logged out of admin');
//     return res.redirect('/');
// });

// router.get('/admin/delete-user/:userId', async (req, res) => {
//     //* First send mail to the user that it is about to be deleted
//     try{
//         let user = await User.findById(req.params.userId)
//         await email(user, 'deleteUser.ejs', 'Your Account deleted by the taxtds Admin');
//         req.flash('success', 'Deletion email sent to the user')

//         //! Do the delete operation
//         await Service.deleteMany({addedBy: req.params.userId})
//         await User.deleteOne({id: req.params.userId})
//         req.flash('success', 'The user and all their services were deleted successfully')
//     }
//     catch(err){
//         console.log(err);
//         req.flash('failure', 'There was a problem in completely deleting the user')
//     }
//     return res.redirect('/admin');
// })

// router.get('/admin/delete-service/:serviceId', async (req, res) => {
//     //* send mail to the user that its service is deleted (check this again with email functionality)
//     try{
//         let service = await Service.findById(req.params.serviceId);
//         let user = await User.findById(service.addedBy)
//         await email(user, 'deleteServiceByadmin.ejs', 'Service deleted by Tax TDS admin');
//         req.flash('success', 'Service delete mail sent to the user');

//         //! do the delete operation
//         await Service.deleteOne({id: req.params.serviceId})
//         req.flash('success', 'Successfully deleted the service');
//     }
//     catch(err){
//         console.log(err);
//         req.flash('failure', 'An error occurred while deleting the service')
//     }
//     return res.redirect('back');
// })

// router.post('/service/write-review/:serviceId', async (req, res) => {
//     const review = {
//         name: req.body.name,
//         rating: req.body.rating,
//         comment: req.body.comment
//     };
//     try{
//         let docs = await Service.findByIdAndUpdate(req.params.serviceId, {'$push': {reviews: review}})
//         req.flash('success', 'Successfully posted the review');

//         let user = User.findById(docs.addedBy)
//         user.commentedBy = review.name;
//         user.rating = review.rating;
//         user.review = review.comment;
//         email(user, 'review.ejs', 'Someone posted a review');
//     }
//     catch(err){
//         console.log(err);
//         req.flash('failure', 'There was a problem in posting the review. Please try again')
//     }
//     return res.redirect('back');
// });

// router.get('/service/details/:serviceId', async (req, res) => {
//     try{
//         let docs = await Service.findById(req.params.serviceId)
//         if(docs.length != 0){
//             return res.render('details.ejs', {
//                 titleTop: 'User Details',
//                 services: docs
//             });
//         }
//     }
//     catch(err){
//         console.log(err);
//         req.flash('failure', 'Service not found');
//         return res.redirect('back');
//     }
// });

// router.get('/', async (req, res) => {
//     let userServices = [];
//     let count = await Service.count();
//     const resultsPerPage = 25;
//     let page = req.query.page ? Number(req.query.page) : 1;
//     let totalNumberofPages = Math.ceil(Number(count)/resultsPerPage);

//     try{
//         userServices = await Service.find({}).limit(resultsPerPage).skip((page - 1) * resultsPerPage)
//     }
//     catch(err){
//         console.log(err)
//     }

//     return res.render('index.ejs', {
//         titleTop: 'Home | Tax TDS',
//         additional: '',
//         user: req.user,
//         services: userServices,
//         admin: getAdmin(),
//         page: page,
//         total: totalNumberofPages
//     });
// });

// // Searching (title bar state/service search)
// router.get('/search', async (req, res) => {
//     const state = req.query.state;
//     const service = req.query.service;
//     const stateSearch = { '$regex': state, '$options': 'i'  }
//     const serviceSearch = { '$regex': service, '$options': 'i'}
//     let userServices = [];
//     try{
//         if(state  != '' && service != ''){
//             userServices =  await Service.find({ $or: [{ 'state': stateSearch }, { 'services': serviceSearch }] })
//         }
//         else if(state != '' && service == ''){
//             userServices = await Service.find({ state: stateSearch })
//         }
//         else{
//             userServices = await Service.find({ services: serviceSearch })
//         }
//     }
//     catch(err){
//         console.log(err)
//     }

//     if(userServices.length == 0){
//         req.flash('failure', 'No data found');
//     }
//     return res.render('index.ejs', {
//         titleTop: 'Search | Tax TDS',
//         additional: 'Search Query Results . . . .',
//         user: req.user,
//         services: userServices,
//         admin: getAdmin(),
//         page: 1,
//         total: 1
//     });
// });

// router.get('/professions', async (req, res) => {
//     const profession = req.query.profession
//     let userServices = [];
//     try{
//         if(profession == 'all'){
//             userServices = await Service.find({})
//         }
//         else{
//             userServices = await Service.find({ professions: profession })
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
//     return res.render('index.ejs', {
//         titleTop: 'Search | Tax TDS',
//         additional: 'Search Query Results . . . . ',
//         user: req.user,
//         services: userServices,
//         admin: getAdmin(),
//         page: 1,
//         total: 1
//     });
// })

// module.exports = router;
