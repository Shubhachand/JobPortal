import express from 'express';
const router = express.Router();


import isAuth from '../middlewares/isAuth.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

router.route("/post").post(isAuth,postJob);
router.route("/get").get(isAuth,getAllJobs);
router.route("/getadminjobs").get(isAuth,getAdminJobs);
router.route("/get/:id").get(isAuth,getJobById);

export default router;