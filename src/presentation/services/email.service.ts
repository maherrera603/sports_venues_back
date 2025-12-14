
import { IUser } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { EnvsAdapter, JWTAdapter } from "@/plugins";
import { Transporter, createTransport } from "nodemailer";
import { EmailTemplate } from "@/presentation/templates"

interface Attachment {
    filename: string;
    path: string;
}


interface SendEmailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}


/**
 * Servicio de envío de correos electrónicos.
 * 
 * Esta clase encapsula la configuración de **Nodemailer** y expone
 * métodos específicos para enviar correos electrónicos a los usuarios
 * de la aplicación (ej. activación de cuenta).
 */
export class EmailService {
    private transporter: Transporter;

    /**
     * Inicializa el servicio de correo configurando Nodemailer
     * con las credenciales definidas en las variables de entorno.
     */
    constructor(){
        this.transporter = createTransport({
            host: EnvsAdapter.MAILER_SERVICE,
            port: EnvsAdapter.MAILER_PORT,
            secure: false,
            auth: {
                user: EnvsAdapter.MAILER_EMAIL,
                pass: EnvsAdapter.MAILER_SECRET_KEY
            }
        });
    }

    /**
     * Envía un correo de activación de cuenta al usuario.
     * 
     * @param user Usuario al cual se le enviará el correo de activación.
     * @throws {CustomError} Si ocurre un error generando el token JWT.
     * @returns {Promise<boolean>} Retorna `true` si el correo fue enviado exitosamente.
     */
    public async sendEmailForActiveAccount( user: IUser ){
        const token = await JWTAdapter.generateToken({ id: user.id!, email: user.email! });
        if( !token) throw CustomError.conflict("Se ha generado un error al crear el token");

        const link = `${EnvsAdapter.CORS_ORIGIN}/activar-cuenta/${token}`;
        const body = EmailTemplate.activeAccountTemplate( link, user );
        const options = {
            to: user.email!,
            subject: "sports venues - activacion de la cuenta",
            htmlBody: body
        };

        return this.sendEmail( options);
    }

    /**
     * Método privado encargado de enviar un correo electrónico genérico.
     * 
     * @param options Opciones del correo (destinatario, asunto, cuerpo HTML y adjuntos).
     * @throws {CustomError} Si ocurre un error al enviar el correo.
     * @returns {Promise<boolean>} Retorna `true` si el correo fue enviado exitosamente.
     */
    private async sendEmail( options: SendEmailOptions): Promise<boolean>{
        try {
            const { to, subject, htmlBody, attachments } = options;
            this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true
        } catch (error) {
            throw CustomError.internalServer(`no se ha podido enviar el correo electronico -> ${ error }`);
        }
    }

}
