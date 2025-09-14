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
}