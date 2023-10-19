import express from "express";
import {body} from "express-validator";
import {authMiddleware} from "../middlewares/auth-middleware";
import userController from "../controllers/user-controller";
import {upload} from "../helpers/multer";
import {removeCreatedFilesIfError} from "../middlewares/remove-created-files-if-error-middleware";

const router = express.Router()

/** ========================================
 *  AUTHENTICATION
 *  ======================================== */
router.post("/create",
    body("name")
        .notEmpty().withMessage("Please, enter name"),
    userController.create)

router.post("/login", userController.login)

router.get("/availability/:id", userController.getAvailability)
router.post("/availability/:id", userController.setAvailability)

// /** ========================================
//  *  GETS
//  *  ======================================== */
// router.get("/", userController.get)
// router.get("/:id", userController.getOne)
//
// /** ========================================
//  *  PASSWORD
//  *  ======================================== */
// router.post("/password/reset",
//     body("email")
//         .isEmail().withMessage("Please, enter your email."),
//     userController.resetPassword)
//
// router.put("/password/update",
//     authMiddleware(),
//     body("password")
//         .isLength({min: 8}).withMessage("Password can't be less than 8 symbols"),
//     body('passwordConfirmation')
//         .isLength({min: 8}).withMessage("Password can't be les than 8 symbols")
//         .custom((value, {req}) => {
//             return value === req.body.password;
//         }).withMessage("Passwords have to match"),
//     userController.updatePassword)
//
// /** ========================================
//  *  UPDATE and DELETE
//  *  ======================================== */
// router.put("/",
//     authMiddleware(),
//     userController.update)
//
// router.delete("/:id", authMiddleware([Roles.admin]), userController.delete)
//
// /** ========================================
//  *  AVATAR
//  *  ======================================== */
// router.post("/avatar",
//     authMiddleware(),
//     upload.fields([
//         { name: "avatarImage", maxCount: 1 },
//     ]),
//     userController.setAvatar,
//     removeCreatedFilesIfError)
//
// router.delete("/avatar",
//     authMiddleware(),
//     userController.deleteAvatar)

export default router