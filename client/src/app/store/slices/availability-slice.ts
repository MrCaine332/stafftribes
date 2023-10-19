import {createSlice} from "@reduxjs/toolkit";
import {IAvailabilityState} from "@app/types/store";
import {shiftDays} from "@app/utils/shiftDays";
import {getWeek} from "@app/utils/getWeek";
import data from "@app/data/availability.json"

const initialState: IAvailabilityState = data

const availabilitySlice = createSlice({
	name: "availability",
	initialState: initialState,
	reducers: {
		addRange(state, action) {
			const index = action.payload
			let newValues = [...state.availability[index].days]
			if (newValues.length > 4)
				return
			if (newValues.includes(5)) {
				newValues = shiftDays(newValues, 5, 4)
			}
			if (newValues.includes(6)) {
				newValues = shiftDays(newValues, 6, 4)
			}
			newValues.push(5, 6)
			state.availability[index].days = newValues
		},
		removeRange(state, action) {
			const index = action.payload
			const length = state.availability[index].days.length
			if (length < 3)
				return

			state.availability[index].days.splice(length - 2, 2)
		},
		setDays(state, action) {
			const index = action.payload.index
			const changes = action.payload.changes
			console.log(changes)
			state.availability[index].days = changes
		},
		setAvailability(state, action) {
			const index = action.payload.index
			const isAvailable = action.payload.isAvailable
			state.availability[index].isAvailable = isAvailable
		}
	}
})

const { actions, reducer } = availabilitySlice

export const availabilityActions = actions

export default reducer