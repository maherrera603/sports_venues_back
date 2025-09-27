import { IUser } from "@/data/models";

export class EmailTemplate {

    public static activeAccountTemplate( activationLink: string, user: IUser){
        return `
            <!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Activación de cuenta</title>
                </head>
                <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="padding: 40px 0;">
                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <tr>
                                <td align="center" bgcolor="#4CAF50" style="padding: 20px; color:#ffffff; font-size:24px; font-weight:bold;">
                                    Bienvenido a Nuestra Plataforma
                                </td>
                                </tr>
                                <tr>
                                <td style="padding: 30px; color:#333333; font-size:16px; line-height:1.5;">
                                    <p>Hola <strong>${user.name} ${ user.lastname}</strong>,</p>
                                    <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente botón:</p>
                                    <div style="text-align:center; margin: 30px 0;">
                                    <a href="${activationLink}" target="_blank"
                                        style="background-color:#4CAF50; color:#ffffff; padding:15px 25px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">
                                        Activar mi cuenta
                                    </a>
                                    </div>
                                    <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
                                    <p style="margin-top:30px;">Saludos,<br>El equipo de Soporte</p>
                                </td>
                                </tr>
                                <tr>
                                <td align="center" bgcolor="#f4f4f4" style="padding:15px; font-size:12px; color:#888888;">
                                    © ${new Date().getFullYear()} Nuestra Plataforma. Todos los derechos reservados.
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `;
    }
}