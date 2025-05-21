import express from 'express';
const router = express.Router();
import isAuth from '../middlewares/isAuth.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';


router.route("/register").post(isAuth,registerCompany);
router.route("/get").get(isAuth,getCompany);
router.route("/get/:id").get(isAuth,getCompanyById);
router.route("/update/:id").put(isAuth,updateCompany);

export default router;