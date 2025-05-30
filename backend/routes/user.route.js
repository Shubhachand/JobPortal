import express from 'express';
const router = express.Router();
import isAuth from '../middlewares/isAuth.js';
import {register , login,updateProfile,logout} from "../controllers/user.controller.js";
import { singleUpload } from '../middlewares/multer.js';



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuth,singleUpload,updateProfile);
router.route("/logout").get(logout);






export default router;