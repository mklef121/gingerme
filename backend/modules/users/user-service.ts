import { prisma } from "../../database/database-connect"
import { LoginRequest, TokenData } from "./dtos"
import { INVALID_TOKEN, USER_NOT_FOUND } from "./errors"
import { sign, verify, JwtPayload } from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key"

export async function userLogin(login: LoginRequest) {
    const user = await prisma.users.findFirst({
        where: {
            email: login.email
        }
    })

    if (user == null) {
        throw new Error(USER_NOT_FOUND)
    }

    let signData: TokenData = {
        id: user.id
    }
    return sign(signData, SECRET_KEY, { expiresIn: "24h" })
}

export async function getUser(id: number) {
    return await prisma.users.findFirst({
        where: {
            id: id
        }
    })
}

export async function verifyToken(authorizationToken: string) {
    try {
        const decoded = verify(authorizationToken, SECRET_KEY) as JwtPayload
        const user = await getUser(Number(decoded.id))

        if (user == null) {
            throw new Error(USER_NOT_FOUND);
        }

        return user
    } catch (error) {
        throw new Error(INVALID_TOKEN);
    }
}
