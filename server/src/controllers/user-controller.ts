import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {ApiError} from "../exceptions/api-error";

import userService from "../services/user-service";
import {mapQueryToPaginationParams} from "../helpers/mapQueryToParams";
import UserService from "../services/user-service";

class UserController {

    /** ========================================
     *  AUTHENTICATION
     *  ======================================== */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest("Validation error", errors.mapped())
            }

            const { name } = req.body
            const results = await userService.create(name)

            return res.status(201).json({ accessCode: results })
        } catch (e) {
            return next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessCode } = req.body
            const results = await userService.login(accessCode)
            return res.status(200).json(results)
        } catch (e) {
            return next(e)
        }
    }

    async getAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const results = await userService.getAvailability(id)

            return res.status(200).json(results)
        } catch (e) {
            return next(e)
        }
    }

    async setAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const results = await userService.setAvailability(id, req.body)

            return res.status(200).json(results)
        } catch (e) {
            return next(e)
        }
    }



    /** ========================================
     *  USER'S AVATAR
     *  ======================================== */
    async setAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            if (!id || isNaN(Number(id)))
                throw ApiError.BadRequest("Invalid user id")

            if (!req.files
                || req.files instanceof Array
                || Object.keys(req.files).length === 0
                || !req.files.avatarImage
                || req.files.avatarImage.length === 0) {
                throw ApiError.BadRequest("Error while uploading avatar image",
                    {"avatarImage": { msg: "Error while uploading avatar image" }})
            }

            const result = await userService.setAvatar(Number(id), req.files.avatarImage[0].filename)

            res.status(200).json(result)
        } catch (e) {
            return next(e)
        }
    }

    async deleteAvatar(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (e) {
            return next(e)
        }
    }

}

export default new UserController()