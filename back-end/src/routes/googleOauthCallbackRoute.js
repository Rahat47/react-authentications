import jwt from 'jsonwebtoken'
import { getGoogleUser } from '../utils/getGoogleUser'
import { updateOrCreateUserFromOAuth } from '../utils/updateOrCreateUserFromOAuth'

export const googleOauthCallbackRoute = {
    path: "/auth/google/callback",
    method: "get",
    handler: async (req, res) => {
        try {
            const { code } = req.query

            const oauthUserInfo = await getGoogleUser({ code })
            const updatedUser = await updateOrCreateUserFromOAuth({ oauthUserInfo })
            const { _id: id, isVerified, email, info } = updatedUser

            jwt.sign(
                { id, email, isVerified, info },
                process.env.JWT_SECRET,
                { expiresIn: "2d" },
                (err, token) => {
                    if (err) return res.sendStatus(500)

                    res.redirect(`http://localhost:3000/login?token=${token}`)
                }
            )
        } catch (error) {
            res.status(500).send(error)
        }

    }
}