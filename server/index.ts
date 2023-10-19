import express from 'express'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import cors from 'cors'
import router from './src/router'
import {errorMiddleware} from "./src/middlewares/error-middleware";
import * as mongoose from "mongoose";

const app = express()

const main = async () => {
	try {
		// @ts-ignore
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		const corsOptions ={
			origin: 'http://localhost:3000',
			credentials: true,            //access-control-allow-credentials:true
			optionSuccessStatus: 200
		}

		app.use(express.json())
		app.use(cookieParser())
		app.use(cors(corsOptions))
		app.use("/api", router)
		app.use("/api/images", express.static(__dirname + "/images"))
		app.use(errorMiddleware)

		const PORT = process.env.PORT || 5000

		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}`)
		})
	}
	catch (e) {
		console.log(e)
	}
}

main()