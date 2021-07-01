import { getDbConnection } from "../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { sendEmail } from "../utils/sendEmail";

export const signupRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        try {

            const { email, password } = req.body

            const db = getDbConnection("ReactAuth")

            const user = await db.collection("users").findOne({ email })

            if (user) return res.sendStatus(409)

            const passwordHash = await bcrypt.hash(password, 10)
            const verificationString = uuid()

            const startingInfo = {
                hairColor: "",
                favouriteFood: "",
                bio: ""
            }

            const result = await db.collection("users").insertOne({
                email,
                passwordHash,
                info: startingInfo,
                isVerified: false,
                createdAt: new Date(),
                verificationString
            })

            const { insertedId } = result

            try {
                await sendEmail({
                    to: email,
                    from: "djrayhan8@gmail.com",
                    subject: "Verify Your Email!!!",
                    text: ` 
                        Thanks for signing up! To verify your email, Please Click Here:
                        http://localhost:3000/verify-email/${verificationString}
                    
                    `
                })
            } catch (error) {
                console.log(error)
                res.sendStatus(500)
            }

            jwt.sign({
                id: insertedId,
                email,
                info: startingInfo,
                isVerified: false
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
        } catch (error) {
            res.status(404).send(error)
        }
    },
};