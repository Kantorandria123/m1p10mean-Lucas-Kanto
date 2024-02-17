const nodemailer = require('nodemailer');

const sendEmailControllerFn = async (req, res) => {
    const { to, subject, text,html } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lucasrazafinjatovo77@gmail.com',
                pass: 'xqbi pvni gpbi jzwx'
            }
        });
        const mailOptions = {
            from: 'lucasrazafinjatovo77@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html:html
        };
        await transporter.sendMail(mailOptions);
        console.log("envoi reussi ")
        res.status(200).send('E-mail envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
    }
};
module.exports ={ sendEmailControllerFn};