// import express, { Request, Response } from "express";
// const router = express.Router();
// import mongoose from "mongoose";
// import User from "../models/user";
// import Service from "../models/service";
// import email from "../utils/nodemailer";
// import upload from "../utils/multer";
// import fs from "fs";
// import path from "path";
// // use aws sdk
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// router.get("/user", (req, res) => {
//   if (req.user && req.isAuthenticated()) {
//     let userServices = [];
//     Service.find(
//       { addedBy: mongoose.Types.ObjectId(req.user.id) },
//       (err, docs) => {
//         if (err) console.log(err);
//         else {
//           if (docs && docs.length > 0) userServices = docs;
//           else req.flash("failure", "You have not registered any services");
//         }
//         req.flash("success", "Successfully logged in");
//         return res.render("user.ejs", {
//           titleTop: "Profile",
//           name: req.user.name,
//           services: userServices,
//         });
//       }
//     );
//   } else {
//     req.flash(
//       "failure",
//       "You are not authenticated, signup (create account) or login first"
//     );
//     return res.redirect("/");
//   }
// });

// async function uploadFiles(file, width) {
//   try {
//     let filePath = path.resolve(
//       __dirname,
//       `../uploads/resized/${file.filename}`
//     );
//     await sharp(file.path).resize({ width: width }).toFile(filePath);
//     let data = await cloudinary.uploader.upload(filePath);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// router.post(
//   "/user/add-service",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "galleryImg1", maxCount: 1 },
//     { name: "galleryImg2", maxCount: 1 },
//     { name: "galleryImg3", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     if (!req.isAuthenticated()) {
//       req.flash(
//         "flash",
//         "You are not authenticated to add service, signup (create account) or login first!"
//       );
//       return res.redirect("/");
//     } else {
//       const userListedServices = req.body.userListedServices;
//       let servicesSanitized = [];
//       for (let i = 0; i < userListedServices.length; i++) {
//         if (userListedServices[i] != null)
//           servicesSanitized.push(userListedServices[i]);
//       }
//       const professions = req.body.professions;
//       let sanitizedProfessions = [];
//       for (let i = 0; i < professions.length; i++) {
//         if (professions[i] != null && professions[i] != "")
//           sanitizedProfessions.push(professions[i]);
//       }
//       const gallery = [
//         req.files.galleryImg1[0],
//         req.files.galleryImg2[0],
//         req.files.galleryImg3[0],
//       ];
//       const avatar = req.files.avatar[0];

//       let galleryUrls = [];
//       let avatarUrl;
//       try {
//         for (let i = 0; i < 3; i++) {
//           let abc = await uploadFiles(gallery[i], 700);
//           galleryUrls.push(abc.secure_url);
//         }
//         avatarUrl = await uploadFiles(avatar, 600);

//         const service = new Service({
//           brandName: req.body.brandName,
//           tagline: req.body.tagline,
//           avatar: avatarUrl.secure_url,
//           gallery: galleryUrls,
//           owner: req.body.owner,
//           experience: req.body.experience,
//           establishment: req.body.establishment,
//           addedBy: req.user.id,
//           phone: req.body.phone,
//           email: req.body.email,
//           professions: sanitizedProfessions,
//           address: req.body.address,
//           state: req.body.state,
//           services: servicesSanitized,
//         });
//         await service.save();

//         // unlink the uploaded files from the file system after saving in the remote database
//         for (let i = 0; i < 3; i++) {
//           fs.unlink(
//             path.resolve(
//               __dirname,
//               `../uploads/resized/${gallery[i].filename}`
//             ),
//             (err) => {
//               if (err) console.log(err);
//             }
//           );
//           fs.unlink(
//             path.resolve(__dirname, `../uploads/${gallery[i].filename}`),
//             (err) => {
//               if (err) console.log(err);
//             }
//           );
//         }
//         fs.unlink(
//           path.resolve(__dirname, `../uploads/resized/${avatar.filename}`),
//           (err) => {
//             if (err) console.log(err);
//           }
//         );
//         fs.unlink(
//           path.resolve(__dirname, `../uploads/${avatar.filename}`),
//           (err) => {
//             if (err) console.log(err);
//           }
//         );

//         req.flash(
//           "success",
//           "Your service has been successfully registered in tax TDS"
//         );
//         res.redirect("/user");
//       } catch (err) {
//         console.log(err);
//         req.flash(
//           "failure",
//           "There was an error in registering your service, try again"
//         );
//         res.redirect("back");
//       }
//     }
//   }
// );

// router.get("/service/edit/:serviceId", (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash(
//       "flash",
//       "You are not authenticated to add service, signup (create account) or login first!"
//     );
//     return res.redirect("/");
//   } else {
//     Service.findById(req.params.serviceId, (err, doc) => {
//       if (err) console.log(err);
//       else {
//         if (doc) {
//           res.render("partials/edit-service.ejs", {
//             titleTop: "Edit Service Details",
//             name: req.user.name,
//             services: doc,
//           });
//         } else {
//           req.flash("failure", "Service not found");
//           res.redirect("back");
//         }
//       }
//     });
//   }
// });

// router.post("/service/edit/:serviceId", (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash(
//       "flash",
//       "You are not authenticated to add service, signup (create account) or login first!"
//     );
//     return res.redirect("/");
//   } else {
//     const userListedServices = req.body.userListedServices;
//     let servicesSanitized = [];
//     for (let i = 0; i < userListedServices.length; i++) {
//       if (userListedServices[i] != null)
//         servicesSanitized.push(userListedServices[i]);
//     }
//     const professions = req.body.professions;
//     let sanitizedProfessions = [];
//     for (let i = 0; i < professions.length; i++) {
//       if (professions[i] != null && professions[i] != "")
//         sanitizedProfessions.push(professions[i]);
//     }

//     const updates = {
//       brandName: req.body.brandName,
//       tagline: req.body.tagline,
//       owner: req.body.owner,
//       experience: req.body.experience,
//       establishment: req.body.establishment,
//       addedBy: req.user.id,
//       phone: req.body.phone,
//       email: req.body.email,
//       professions: sanitizedProfessions,
//       services: servicesSanitized,
//       address: req.body.address,
//       state: req.body.state,
//     };
//     console.log(updates);
//     Service.findByIdAndUpdate(req.params.serviceId, updates, (err, docs) => {
//       if (err) {
//         req.flash(
//           "failure",
//           "There was a problem in updating your service. Please try again"
//         );
//         console.log(err);
//       } else {
//         req.flash("success", "Successfully updated your service");
//       }
//     });
//     res.redirect("/user");
//   }
// });

// router.get("/user/delete-service/:serviceId", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash(
//       "flash",
//       "You are not authenticated to add service, signup (create account) or login first!"
//     );
//     return res.redirect("/");
//   } else {
//     try {
//       const service = await Service.findById(req.params.serviceId);
//       const user = await User.findById(service.addedBy);
//       await email(
//         user,
//         "deleteServiceByUser.ejs",
//         "You deleted one of your service(s)"
//       );

//       //! do the delete operation
//       await Service.deleteOne({ id: req.params.serviceId });
//       req.flash("success", "Successfully deleted the service");
//     } catch (err) {
//       console.log(err);
//       req.flash(
//         "failure",
//         "A problem occured. Cannot delete service, try again"
//       );
//     }
//     res.redirect("back");
//   }
// });

// router.post("/login", (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });

//   passport.authenticate("local", { failureRedirect: "/" })(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       req.flash("failure", "An error occured");
//       return res.redirect("/");
//     } else {
//       req.login(user, (error) => {
//         if (error) {
//           console.log(error);
//           req.flash("failure", "An error occured");
//           return res.redirect("/");
//         } else {
//           req.flash("success", "Successfully logged in to your account");
//           res.redirect("/user");
//         }
//       });
//     }
//   });
// });

// router.post("/signup", (req, res) => {
//   User.findOne({ username: req.body.username }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//       req.flash(
//         "failure",
//         "There was a problem in creating account, please try again"
//       );
//       return res.redirect("/");
//     } else if (foundUser) {
//       req.flash(
//         "failure",
//         "There is already a user with the same id, login or signup with a different email"
//       );
//       return res.redirect("/");
//     } else {
//       if (req.body.password == req.body.confirm_password) {
//         User.register(
//           { username: req.body.username, name: req.body.name },
//           req.body.password,
//           (err, user) => {
//             if (err) {
//               console.log(err);
//               return res.redirect("back");
//             } else {
//               passport.authenticate("local")(req, res, () => {
//                 req.flash(
//                   "success",
//                   "Successfully created your account on tax TDS"
//                 );
//                 email(
//                   user,
//                   "signup.ejs",
//                   "You have successfully created your account in Tax TDS"
//                 );
//                 res.redirect("/user");
//               });
//             }
//           }
//         );
//       } else {
//         req.flash("failure", "Passwords did not match, try again");
//         res.redirect("/");
//       }
//     }
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   req.flash("success", "Successfully logged out");
//   return res.redirect("/");
// });

// module.exports = router;
