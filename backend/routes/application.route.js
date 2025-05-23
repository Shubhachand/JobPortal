import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuth, applyJob);
router.route("/get").get(isAuth, getAppliedJobs);
router.route("/:id/applicants").get(isAuth, getApplicants);
router.route("/status/:id/update").post(isAuth, updateStatus);

export default router;
