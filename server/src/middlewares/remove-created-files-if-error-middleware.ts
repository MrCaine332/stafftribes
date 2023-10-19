import {NextFunction, Request, Response} from "express";
import fs from "fs"

/** @description
 * Searches through req.file and req.files to find
 * all files that have been created before error occured.
 * Deletes found files.
 * */
export const removeCreatedFilesIfError = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (!req.file && !req.files)
		return next(err)

	const filesToDelete = []
	if (req.file) {
		filesToDelete.push(req.file)
	}
	if (req.files) {
		if (req.files instanceof Array) {
			req.files.forEach((file) => {
				filesToDelete.push(file)
			})
		} else {
			for (let field in req.files) {
				req.files[field].forEach((file) => {
					filesToDelete.push(file)
				})
			}
		}
	}

	filesToDelete.forEach((file) => {
		try {
			fs.unlinkSync(file.path)
		} catch (e) {
			console.log(`File in path ${file.path} does not exist`)
		}
	})
	next(err)
}