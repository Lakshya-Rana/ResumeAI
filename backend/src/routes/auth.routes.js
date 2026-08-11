import { Router } from "express";
import { forgotPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controllers/users.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router= Router()
//unprotected routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/reset-password/").post(resetPassword)
router.route("/forgot-password/").post(forgotPassword)

//protected routes
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/get-current-user").get(verifyJwt,getCurrentUser)

export default router