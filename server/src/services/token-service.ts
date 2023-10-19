import {TokenPayload} from "../types/token-payload";
import {AppDataSource} from "../../data-source";
import {Token} from "../models/token.entity";
import * as jwt from "jsonwebtoken"
import {User} from "../models/user.entity";

class TokenService {
    generateTokens(payload: TokenPayload, type: "temporal" | "permanent" = "temporal") {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: "30m"})
        let refreshToken

        if (type === "permanent") {
            refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: "30d"})
        } else {
            refreshToken = jwt.sign({...payload, temporal: true}, process.env.JWT_REFRESH_SECRET!, {expiresIn: "24h"})
        }

        return {
            accessToken,
            refreshToken
        }
    }

    validateToken(token: string, tokenType: "ACCESS" | "REFRESH") {
        try {
            const payload = jwt.verify(token, process.env[`JWT_${tokenType}_SECRET`]!)
            return payload
        } catch (e) {
            return null
        }
    }

    async saveRefreshToken(user: User, refreshToken: string, deviceId: string) {
        const existingToken = await AppDataSource.getRepository(Token)
            .findOneBy({user: { id: user.id }, deviceId: deviceId || ""})
        if (existingToken) {
            existingToken.refreshToken = refreshToken
            await AppDataSource.getRepository(Token).save(existingToken)
            return
        }

        const token = new Token()
        token.refreshToken = refreshToken
        token.deviceId = deviceId
        token.user = user
        token.createdAt = new Date()

        AppDataSource.getRepository(Token).create(token)
        const createdToken = await AppDataSource.getRepository(Token).save(token)

        return createdToken
    }

    async deleteToken(deviceId: string) {
        const existingToken = await AppDataSource.getRepository(Token)
            .findOneBy({deviceId: deviceId || ""})
        if (existingToken) {
            await AppDataSource.getRepository(Token).delete(existingToken.id)
        }
        return existingToken
    }

    async findToken(refreshToken: string, deviceId: string) {
        const token = await AppDataSource.getRepository(Token)
            .findOneBy({refreshToken: refreshToken, deviceId: deviceId})
        return token
    }
}

export default new TokenService()