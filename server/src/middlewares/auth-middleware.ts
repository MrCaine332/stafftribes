import {ApiError} from "../exceptions/api-error";
import {Request, Response, NextFunction} from "express";
import tokenService from "../services/token-service";
import {TokenPayload} from "../types/token-payload";
import {JwtPayload} from "jsonwebtoken";
import {AppDataSource} from "../../data-source";
import {User} from "../models/user.entity";
import {Roles} from "../enums";

export const authMiddleware = (roles?: Roles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
                throw ApiError.UnauthorizedError()
            }

            const accessToken = authorizationHeader.split(" ")[1]
            if (!accessToken) {
                throw ApiError.UnauthorizedError()
            }

            const tokenPayload = tokenService.validateToken(accessToken, "ACCESS") as
                (JwtPayload & TokenPayload ) | null
            if (!tokenPayload) {
                throw ApiError.UnauthorizedError()
            }

            const user = await AppDataSource.getRepository(User).findOneBy({ id: tokenPayload.userId })
            if (!user) {
                throw ApiError.UnauthorizedError()
            }

            req.payload = tokenPayload

            if (roles && roles.length > 0 && !roles.includes(user.role)) {
                throw ApiError.Forbidden()
            }

            next()
        } catch (e) {
            return next(e)
        }
    }
}