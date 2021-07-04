import { v4 as uuid } from 'uuid'
import { getDbConnection } from '../db'
import { sendEmail } from '../utils/sendEmail'


export const forgotPassword = {
    path: "/api/forgot-password/:email",
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params
        const db = getDbConnection("ReactAuth")

        const passwordResetCode = uuid()

        const { result } = await db.collection("users").updateOne({ email }, {
            $set: { passwordResetCode }
        })

        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: "djrayhan8@gmail.com",
                    subject: "Reset your Password",
                    text: `To reset your password, Click this link:
                    http://localhost:3000/reset-password/${passwordResetCode}
                    `
                })
            } catch (error) {
                console.log(error);
                res.sendStatus(500)
            }
        }

        res.sendStatus(200)
    }
}