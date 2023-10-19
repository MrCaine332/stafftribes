import {model, Schema} from "mongoose";
import {IAvailability} from "../models/availability-model";
interface IUser {
    name: string
    accessCode: string
    availability: IAvailability
}

const UserSchema = new Schema<IUser>({
    name: {type: String, required: true},
    accessCode: {type: String, unique: true, required: true},
    availability: {}
})

export const User = model('User', UserSchema)

