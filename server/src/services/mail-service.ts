const nodemailer = require("nodemailer")

class MailService {
	private transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation",
            text: "",
            html:
`                <div>
                    <h1>Follow activation link</h1>
                    <a href="${link}">${link}</a>
                </div>`
        })
    }

    async sendResetPasswordMail(to: string, password: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Reset password",
            text: "",
            html:
                `                <div>
                    <h1>Your new password</h1>
                    <span>${password}</span>
                </div>`
        })
    }

}

export default new MailService()