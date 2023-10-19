import multer from "multer";
import path from "path";
import {ApiError} from "../exceptions/api-error";

/** TODO: Finalize fileFilter */
export const upload = multer({
	dest: path.resolve(__dirname, '..', '../images/'),
	fileFilter: (req, file, callback) => {
		switch (file.mimetype) {
			case "image/png":
				callback(null, true)
				break
			case "image/jpeg":
				callback(null, true)
				break
			default:
				callback(ApiError.BadRequest("Incorrect image format", { [file.fieldname]: { msg: "Image must be either PNG or JPG format"} }))
				break
		}
	}
})