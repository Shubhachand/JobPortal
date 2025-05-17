import express from 'express';
const router = express.Router();

// import {register , login,updateProfile,logout} from "../controllers/user.controller.js";
import isAuth from '../middlewares/isAuth.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';


// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/profile/update").post(isAuth,updateProfile);
// router.route("/logout").post(logout);


router.route("/registers").post(isAuth,registerCompany);
router.route("/get").get(isAuth,getCompany);
router.route("/get/:id").get(isAuth,getCompanyById);
router.route("/update/:id").put(isAuth,updateCompany);



export default router;