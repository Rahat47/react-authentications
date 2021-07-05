import { getDbConnection } from "../db";


export const updateOrCreateUserFromOAuth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email
    } = oauthUserInfo

    const db = getDbConnection("ReactAuth")
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate({ email },
            { $set: { googleId, isVerified }, },
            { returnOriginal: false })

        return result.value
    } else {
        const result = await db.collection("users").insertOne({
            email,
            googleId,
            isVerified,
            createdAt: new Date(),
            info: {}
        })

        return result.ops[0]
    }

}