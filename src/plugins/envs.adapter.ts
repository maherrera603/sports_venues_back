import "dotenv/config";
import { get } from "env-var";

/**
 * Clase Adaptador para obtener variables de entorno de forma segura.
 */
export class EnvsAdapter {

    /**
     * Puerto Configurado en las variables de entorno.
     * @throws Si la variable PORT no esta definida o no es un numero valido de puerto.
     */
    public static get PORT(): number{
        return get('PORT').required().asPortNumber();
    }

    /**
     * Url de conexion a mongo en las variables de entorno.
     * @throws Si la variable DATABASE_MONGODB_URL no esta definida o no es un string valido
     */
    public static get DATABASE_MONGODB_URL(): string{
        return get("DATABASE_MONGODB_URL").required().asString();
    }

    /**
     * Nombre de la base de datos en las variables de entorno.
     * @throws Si la variable DATABASE_NAME no esta definida o no es un string valido
     */
    public static get DATABASE_NAME(): string{
        return get("DATABASE_NAME").required().asString();
    }

    /**
     * Semilla/clave secreta utilizada para firmar y validar JWT.
     *
     * ⚠️ Debe mantenerse en secreto y nunca exponerse públicamente.
     * Usualmente se define en `.env` como `JWT_SEED`.
     */
    public static get JWT_SEED(): string{
        return get("JWT_SEED").required().asString();
    }

    /**
     * Duración de validez de un JWT en horas.
     *
     * Ejemplo: si `JWT_DURATION_HOURS=1`, el token expira en 1 hora.
     */
    public static get JWT_DURATION_HOURS(): number {
        return get("JWT_DURATION_HOURS").required().asInt();
    }

    /**
     * Duración de validez de un JWT en segundos.
     *
     * Ejemplo: si `JWT_DURATION_SECONDS=3600`, el token expira en 3600s (1 hora).
     */
    public static get JWT_DURATION_SECONDS(): number {
        return get("JWT_DURATION_SECONDS").required().asInt();
    }

    /**
     * Obtiene el nombre del servicio de correo configurado.
     *
     * Este valor se extrae de la variable de entorno `MAILER_SERVICE` y
     * representa el proveedor de correo electrónico que se usará
     * (ej. `"gmail"`, `"outlook"`, `"sendgrid"`, etc.).
     *
     * @returns {string} Nombre del servicio de correo.
     * @throws Error si la variable de entorno no está definida.
     */
    public static get MAILER_SERVICE(): string {
        return get("MAILER_SERVICE").required().asString();
    }

    /**
     * Obtiene la dirección de correo electrónico del remitente principal.
     *
     * Este valor se extrae de la variable de entorno `MAILER_EMAIL` y se utiliza
     * como cuenta desde la cual se enviarán los correos electrónicos del sistema.
     *
     * @returns {string} Dirección de correo electrónico configurada.
     * @throws Error si la variable de entorno no está definida.
     */
    public static get MAILER_EMAIL(): string {
        return get("MAILER_EMAIL").required().asString();
    }

    /**
     * Obtiene la clave secreta utilizada para autenticar el servicio de correo.
     *
     * Este valor se extrae de la variable de entorno `MAILER_SECRET_KEY` y corresponde
     * a la contraseña, token o clave de aplicación generada por el proveedor de correo.
     *
     * @returns {string} Clave secreta para autenticación con el servicio de correo.
     * @throws Error si la variable de entorno no está definida.
     */
    public static get MAILER_SECRET_KEY(): string {
        return get("MAILER_SECRET_KEY").required().asString();
    }

}