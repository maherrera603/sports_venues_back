import { genSaltSync, compareSync, hashSync} from "bcrypt";

/**
 * Adaptador para operaciones de encriptación de contraseñas utilizando la librería `bcrypt`.
 *
 * Esta clase ofrece métodos estáticos para:
 * - Generar un hash seguro de una contraseña.
 * - Comparar una contraseña en texto plano con su hash encriptado.
 *
 * @class BcryptAdapter
 */
export class BcryptAdapter {

    /**
     * Genera un hash seguro a partir de una contraseña en texto plano.
     *
     * @param pwd - Contraseña en texto plano a encriptar.
     * @returns El hash generado de la contraseña.
     */
    public static hash_pwd( pwd: string) {
        const salt = genSaltSync();
        return hashSync( pwd, salt);
    }

     /**
     * Compara una contraseña en texto plano con un hash previamente encriptado.
     *
     * @param pwd - Contraseña en texto plano a verificar.
     * @param pwd_hash - Hash previamente generado con bcrypt.
     * @returns `true` si la contraseña coincide con el hash, `false` en caso contrario.
     */
    public static compare_pwd( pwd: string, pwd_hash: string){
        return compareSync( pwd, pwd_hash);
    }
}