import jwt from "jsonwebtoken";
import { EnvsAdapter } from "./envs.adapter";


/**
 * Interfaz que representa la carga útil (payload) que se incluye en el JWT.
 */
interface IPayload {
    /** Identificador único del usuario */
    id: string;

    /** Correo electrónico del usuario */
    email: string;
}


/**
 * Adaptador para la generación y validación de tokens JWT.
 *
 * Esta clase encapsula el uso de la librería `jsonwebtoken`, ofreciendo
 * métodos estáticos para trabajar con JWT sin acoplar directamente
 * la aplicación a la librería externa.
 *
 * @class JWTAdapter
 */
export class JWTAdapter {

    /**
     * Genera un token JWT a partir de un payload dado.
     *
     * @param payload - Objeto con los datos que se incluirán en el token.
     * @returns Una promesa que resuelve en el token generado (string),
     *          o `null` si ocurrió un error.
     */
    public static generateToken( payload: IPayload ): Promise<string|null>{
        const expiresIn = EnvsAdapter.JWT_DURATION_SECONDS * EnvsAdapter.JWT_DURATION_HOURS;

        return new Promise( resolve => {
            jwt.sign(
                payload,
                EnvsAdapter.JWT_SEED,
                { expiresIn },
                ( error, token ) => resolve( error ? null : token as string)
            );
        });
    }


    /**
     * Valida un token JWT y retorna el payload decodificado si es válido.
     *
     * @typeParam T - Tipo esperado del payload.
     * @param token - El token JWT a validar.
     * @returns Una promesa que resuelve en el objeto decodificado de tipo `T`,
     *          o `null` si el token es inválido o expiró.
     */
    public static validatedToken<T>( token: string): Promise<T | null>{
        return new Promise( resolve => {
            jwt.verify( 
                token, 
                EnvsAdapter.JWT_SEED, 
                (error, decoded) => resolve( error ? null : decoded as T)
            );
        });
    }

}