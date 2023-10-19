
export type WeekAvailability = {
	isAvailable: boolean
	days: number[]
}

export interface IAvailabilityState {
	startingWeek: number
	year: number
	availability: WeekAvailability[]
}