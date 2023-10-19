import {model, Schema} from "mongoose";

export interface IAvailability {
	startingWeek: number
	year: number
	availability: {
		isAvailable: boolean
		weeks: number[]
	}[]
}

const AvailabilitySchema = new Schema<IAvailability>({
	startingWeek: {type: Number, required: true},
	availability: {}
})

export const Availability = model('Availability', AvailabilitySchema)