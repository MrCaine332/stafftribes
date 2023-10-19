import {ApiError} from "../exceptions/api-error"
import {Request, Response, NextFunction} from "express";
import multer from "multer";

export const errorMiddleware = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if (err instanceof multer.MulterError) {
        return res.status(400).json({message: err.message, errors: { image: err.code }})
    }
    return res.status(500).json({ message: "Something went wrong" })
}