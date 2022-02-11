// const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const Service = require('../models/service');
// const email = require('../config/nodemailer');
// const JWT_SECRET = 'somesuperlinkhere'

// router.get('/forgot-password', (req, res) => {
//     res.render('partials/forgot-password.ejs', {
//         titleTop: 'Forgot Password'
//     });
// })

// router.post('/forgot-password', (req, res) => {
//     const username = req.body.username;
//     let foundUser;
//     User.find({username: username}, (err, docs) => {
//         if(err){
//             console.log(err);
//             req.flash('failure', 'There was an error in the process, try again');
//             res.redirect('back')
//         }
//         else if(docs && docs.length>0){
//             foundUser = docs[0];
//             const secret = JWT_SECRET + foundUser.id
//             const payload = {
//                 username: foundUser.username,
//                 id: foundUser.id
//             }
//             const token = jwt.sign(payload, secret, {expiresIn: '15m'});
//             const link = `taxtds.com/reset-password/${foundUser.id}/${token}`;

//             foundUser.link = link;
//             email(foundUser, 'forgotPassword.ejs', 'Reset Password link');
//             req.flash('success', 'Password reset link has been sent to your email');
//             console.log(link);

//             res.redirect('/');
//         }
//         else{
//             req.flash('failure', 'user not found');
//             res.redirect('back');
//         }
//     })
// })

// router.get('/reset-password/:id/:token', (req, res) => {
//     const { id, token } = req.params;
//     User.findById(id, (err, user) => {
//         if(err){
//             console.log(err);
//             req.flash('failure', 'there was an error');
//             res.redirect('back');
//         }
//         else if(user){
//             const secret = JWT_SECRET + user.id
//             try {
//                 const payload = jwt.verify(token, secret);
//                 res.render('partials/reset-password.ejs', {
//                     titleTop: 'Forgot Password',
//                     user: user
//                 });
//             }
//             catch(error){
//                 console.log(error);
//                 req.flash('failure', 'Password reset link expired')
//                 res.redirect('back');
//             }
//         }
//         else{
//             req.flash('failure', 'invalid user or time exceeded');
//             res.redirect('/');
//         }
//     })
//     // console.log(req.params);
//     // res.status(200).send('Successfull');
// })

// router.post('/reset-password/:id/:token', (req, res) => {
//     const { id, token } = req.params;
//     if(req.body.password != req.body.confirmPassword){
//         req.flash('failure', 'Passwords did not match');
//         res.redirect('back')
//     }
//     else{
//         User.findById(id, (err, user) => {
//             if(err){
//                 console.log(err);
//                 req.flash('failure', 'An error occured');
//                 res.redirect('back');
//             }
//             else if(user){
//                 const secret = JWT_SECRET + user.id
//                 try{
//                     const payload = jwt.verify(token, secret);

//                 }
//                 catch(error){
//                     console.log(error);
//                     req.flash('failure', 'Password reset link expired');
//                 }
//                 user.setPassword(req.body.password, () => {
//                     user.save();
//                     req.flash('success', 'password reset successfully, proceed to login');
//                     res.redirect('/');
//                 });
//                 // user.setPassword(password);
//             }
//             else{
//                 req.flash('failure', 'An error occurred');
//                 res.redirect('back');
//             }
//         })
//     }
// })

// module.exports = router;
