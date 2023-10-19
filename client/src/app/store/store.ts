import { configureStore } from '@reduxjs/toolkit'
import availabilityReducer from "./slices/availability-slice"

const store = configureStore({
    reducer: {
        availability: availabilityReducer,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch