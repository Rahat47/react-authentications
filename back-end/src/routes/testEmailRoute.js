import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
    path: "/api/test-email",
    method: "post",
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: "rahatrock123@gmail.com",
                from: "djrayhan8@gmail.com",
                text: "A test email bla bla bla",
                subject: "A Super Test Email",
                html: "<h1> Bla Bla Bla it is working </h1>"
            })

            res.sendStatus(200)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}