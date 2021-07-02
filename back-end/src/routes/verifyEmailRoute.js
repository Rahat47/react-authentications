import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'

export const verifyEmailRoute = {
    path: "/api/verify-email",
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body
        const db = getDbConnection("ReactAuth")

        const result = await db.collection('users').findOne({ verificationString })

        if (!result) return res.status(401).json({
            message: "The Email Verification code does not exist"
        })


        const { _id: id, email, info } = result

        await db.collection("users").updateOne({ _id: ObjectId(id) }, {
            $set: { isVerified: true }
        })


        jwt.sign(
            { email, info, id, isVerified: true },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            },
            (err, token) => {
                if (err) return res.status(500).send(err)

                res.status(200).json({
                    token
                })
            }
        )


    }
}