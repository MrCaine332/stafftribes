import {NextFunction, Request, Response} from "express";


/** @description
 * Parses JSON string from req.body or
 * specified property to properties of req.body object.
 * If req.body is JSON string itself, converts req.body
 * into object and parses fields from JSON string into property.
 *
 * @param field - property of req.body that contains JSON string.
 * If not mentioned, function will check req.body to be a JSON string */
export const JSONToBody = (field?: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const JSONData = field ? req.body[field] : req.body
			console.log(JSONData)
			if (!JSONData)
				throw new Error("Unable to retrieve JSON")

			if (field) delete req.body[field]
			else req.body = {}

			const parsedJSONData = JSON.parse(JSONData)
			for (let field in parsedJSONData) {
				req.body[field] = parsedJSONData[field]
			}
			next()
		} catch (e) {
			return next(e)
		}
	}
}