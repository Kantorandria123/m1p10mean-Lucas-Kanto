// Notification.js
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const rendezvousService = require('./../rendezvous/RendezvousService');


class Notification {
    static getAnotifier()
    {
        return rendezvousService.getRendezvousClientsNotifier();
    }
    static async sendEmail(mailOptions) {
        try {
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'lucasrazafinjatovo77@gmail.com',
                    pass: 'xqbi pvni gpbi jzwx'
                }
            });
            let htmlContent = `
      <!DOCTYPE html>
        <html lang="fr">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href='https://fonts.googleapis.com/css?family=Great Vibes' rel='stylesheet'>
          <title>Notification de rendez-vous</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;text-align: center;">
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>

          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <!-- LOGO -->
              <tr>
                  <td bgcolor="#fd5d5d" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#fd5d5d" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111;font-family: 'Great Vibes'; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-family: 'Great Vibes',cursive;font-size: 48px; font-weight: 400; margin: 2;">Beauty Care!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> `;
                     
                        htmlContent += `
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Vous avez de(s) rendez-vous pour le</p>
                              </td>
                          </tr> `;
                     
                      htmlContent += `

                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Merci de faire confiance à Beauty Care pour vos soins</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Cordialement,<br>Team Beauty Care!</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Besoin d'aide?</h2>
                                  <p style="margin: 0;"><a href="#" target="_blank" style="color: #fd5d5d;text-decoration:none;">N&rsquo;hésitez pas à nous contacter</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>

          </div>

          </body>
        </html>
      `;
           /* let mailOptions = {
                from: 'lucasrazafinjatovo77@gmail.com',
                to: 'kuchylucky@gmail.com',
                subject: 'Notification',
                html: htmlContent
            };*/
            let info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ', info.response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ', error);
        }
    }



    static scheduleEmail() {
        schedule.scheduleJob('00 06 * * *',async function() {
            console.log('Préparation de l\'envoi de l\'email...');
            const result=await Notification.getAnotifier();
            if (result.status && result.rendezvousList) {
                result.rendezvousList.forEach(clientRdv => {
                    const email = clientRdv._id.email;
                    const daty = clientRdv._id.daty;
                    const dateObj = new Date(daty);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const dateLong = dateObj.toLocaleDateString('fr-FR', options);
                    let htmlContent = `
      <!DOCTYPE html>
        <html lang="fr">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href='https://fonts.googleapis.com/css?family=Great Vibes' rel='stylesheet'>
          <title>Notification de rendez-vous</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;text-align: center;">
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>

          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <!-- LOGO -->
              <tr>
                  <td bgcolor="#fd5d5d" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#fd5d5d" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111;font-family: 'Great Vibes'; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-family: 'Great Vibes',cursive;font-size: 48px; font-weight: 400; margin: 2;">Beauty Care!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> `;
                     
                        htmlContent += `
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Vous avez de(s) rendez-vous pour le ${dateLong}.</p>
                              </td>
                          </tr> `;
                     
                      htmlContent += `

                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Merci de faire confiance à Beauty Care pour vos soins.</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Cordialement,<br><br>Team Beauty Care!</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Besoin d'aide?</h2>
                                  <p style="margin: 0;"><a href="#" target="_blank" style="color: #fd5d5d;text-decoration:none;">N&rsquo;hésitez pas à nous contacter</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>

          </div>

          </body>
        </html>
      `;
                    let mailOptions = {
                        from: 'lucasrazafinjatovo77@gmail.com',
                        to: email,
                        subject: 'Rappel des rendez vous',
                        html: htmlContent
                    };
                    Notification.sendEmail(mailOptions);
                });
            }
        });
    }
    
}


module.exports = Notification;
