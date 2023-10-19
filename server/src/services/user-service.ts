import {User} from "../models/user-model";
import {v4} from "uuid";
import {getWeek} from "../helpers/getWeek";
import {ApiError} from "../exceptions/api-error";
import {IAvailability} from "../models/availability-model";


class UserService {
    async create(name: string) {
        const accessCode = v4()

        const user = new User({
            name: name,
            accessCode: accessCode,
            availability: {
                startingWeek: getWeek(),
                availability: [
                    { isAvailable: true, days: [1,2] },
                    { isAvailable: true, days: [2,3] },
                    { isAvailable: true, days: [3,4] },
                    { isAvailable: true, days: [4,5] },
                    { isAvailable: true, days: [5,6] },
                    { isAvailable: true, days: [6,7] },
                    { isAvailable: true, days: [1,2] },
                ]
            }
        })

        await user.save()
        return accessCode
    }

    async login(accessCode: string) {
        const candidate = User.findOne({ accessCode: accessCode })
        if (!candidate)
            throw ApiError.UnauthorizedError()

        return candidate
    }

    async getAvailability(userId: string) {
        const user = await User.findById(userId)
        if (!user)
            throw ApiError.NotFound()

        const userAvailability = user.availability

        const currentWeek = getWeek()

        const currentYear = new Date().getFullYear()
        if (currentYear > userAvailability.year) {
            const actualCurrentWeek = currentWeek + userAvailability.startingWeek
            const weeksToPick = actualCurrentWeek - userAvailability.startingWeek
        }

        if (currentYear === userAvailability.year) {
            const weekOffset = currentWeek - userAvailability.startingWeek
            if (weekOffset === 0) {
                return userAvailability.availability
            }
            if (weekOffset < 0) {
                for (let i = 0; i < 7 + weekOffset; i++) {
                    if (i < 7 + weekOffset) {

                    }
                }

                // return userAvailability.availability.reduce((prev, curr, index) => {
                //     if (index < 7 + weekOffset) {
                //         // @ts-ignore
                //         prev.push(curr)
                //     }
                //     return prev
                // }, [])
            }
            // if (weekOffset > 0) {
            //     return userAvailability.availability.reduce((prev, curr, index) => {
            //         if (index > 7 - weekOffset)
            //             // prev.push(curr)
            //         return prev
            //     }, [])
            //     for (let i = 6; i >= 0; i--) {
            //
            //     }
            // }
            const weeksToPick = 7 - weekOffset
        }

        if (currentYear < userAvailability.year) {
            const actualStartingWeek = currentWeek + userAvailability.startingWeek
        }

        // if (currentYear) {}
        // console.log(currentYear)

        // const

        // const noOfValidWeeks =

        // arr.map((_, index) => {
        //
        // })

        return user.availability
    }

    getAvailableWeeks(weeks: any) {

    }

    async setAvailability(userId: string, body: any) {
        const user = await User.findById(userId)
        if (!user)
            throw ApiError.NotFound()

        user.availability = body
        await user.save()

        console.log(body)
    }

    async setAvatar(id: number, avatarLink: string) {
        // const user = await AppDataSource.getRepository(User).findOneBy({ id: id })
        //
        // if (!user) {
        //     throw ApiError.NotFound()
        // }
        //
        // const prevAvatarLink = user.avatarLink
        // const prevAvatarPath = path.resolve(__dirname, '..', '../images/', prevAvatarLink)
        //
        // user.avatarLink = avatarLink
        // await AppDataSource.getRepository(User).save(user)
        //
        // try {
        //     fs.unlinkSync(prevAvatarPath)
        // } catch (e) {
        //     console.log(`File in path ${prevAvatarPath} does not exist`)
        // }
        //
        // return avatarLink
    }
}

export default new UserService()