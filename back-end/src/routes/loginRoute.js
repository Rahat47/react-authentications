import { getDbConnection } from "../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { email, password } = req.body

            const db = getDbConnection("ReactAuth")
            const user = await db.collection("users").findOne({ email })

            if (!user) return res.sendStatus(401)

            const { _id: id, isVerified, passwordHash, info } = user

            const isCorrect = await bcrypt.compare(password, passwordHash)

            if (isCorrect) {
                jwt.sign({
                    id,
                    email,
                    info,
                    isVerified
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2d"
                    },
                    (err, token) => {
                        if (err) {
                            return res.status(500).send(err)
                        }

                        res.status(200).json({
                            token
                        })
                    })
            } else {
                res.sendStatus(401)
            }


        } catch (error) {
            res.status(404).send(error)
        }
    },
};