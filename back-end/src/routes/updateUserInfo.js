import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { getDbConnection } from '../db'

export const updateUserInfo = {
    path: "/api/users/:userId",
    method: "patch",
    handler: async (req, res) => {
        try {
            const { authorization } = req.headers
            const { userId } = req.params

            const updates = (({
                favouriteFood,
                hairColor,
                bio
            }) => ({
                favouriteFood,
                hairColor,
                bio
            }))(req.body)


            if (!authorization) return res.status(401).json({
                message: "No authorization headers sent"
            })

            const token = authorization.split(" ")[1]

            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) return res.status(401).json({
                    message: "Unable to verify token"
                })

                const { id, isVerified: verified } = decoded

                if (!verified) return res.status(403).json({
                    message: "You need to verify your email. Before you can update your data"
                })

                if (id !== userId) return res.status(403).json({
                    message: "Not allowed to update that user Data"
                })

                const db = getDbConnection("ReactAuth")

                const result = await db.collection("users").findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: { info: updates } },
                    { returnOriginal: false }
                )

                const { email, isVerified, info } = result.value

                jwt.sign({
                    id,
                    email,
                    isVerified,
                    info
                },
                    process.env.JWT_SECRET,
                    { expiresIn: "2d" },
                    (err, token) => {
                        if (err) return res.status(400).json(err)

                        res.status(200).json({ token })
                    }
                )
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}