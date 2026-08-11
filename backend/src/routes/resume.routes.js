import {Router} from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { getMyResumes, uploadResume,getResumeById, extractResumeText, analyzeResume, deleteResume } from "../controllers/resumes.controller.js"

const router=Router()

router.route("/upload").post(verifyJwt,upload.single("resume"),uploadResume)
router.route("/my-resumes").get(verifyJwt,getMyResumes)
router.route("/:resumeId").get(verifyJwt,getResumeById)
router.route("/:resumeId/results").get(verifyJwt, analyzeResume);
router.route("/:resumeId/delete").post(verifyJwt, deleteResume);


export default router