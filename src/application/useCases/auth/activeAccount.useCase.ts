import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { UserRepository } from "@/domain/repositories";
import { JWTAdapter } from "@/plugins";


/**
 * Caso de uso: Activación de cuenta de usuario.
 * 
 * Esta clase se encarga de validar el token de activación,
 * verificar que el usuario exista y actualizar el estado
 * de su cuenta a "activa".
 */
export class ActiveAccount {


    /**
     * @param userRepository Repositorio de usuarios para realizar
     * las operaciones de búsqueda y activación.
     */
    constructor( private readonly userRepository: UserRepository){}


    /**
     * Activa la cuenta de un usuario a partir del token recibido por correo.
     * 
     * Flujo:
     * 1. Valida el token con el `JWTAdapter`.
     * 2. Verifica que el usuario asociado exista en la base de datos.
     * 3. Activa la cuenta del usuario mediante el repositorio.
     * 
     * @param token Token de activación generado previamente y enviado al correo del usuario.
     * @throws {CustomError} Si el token es inválido, el usuario no existe o ocurre algún error.
     * @returns {Promise<IResponse>} Respuesta indicando el éxito de la activación.
     */
    public async execute( token: string): Promise<IResponse>{
        const payload = await JWTAdapter.validatedToken<{ email: string, id: string}>( token);
        if( !payload ) throw CustomError.unauthorized("no tiene permisos para realizar la activacion de la cuenta");
        
        const user = await this.userRepository.findUserById( payload.id);
        if(!user) throw CustomError.notFound("El usuario no ha sido encontrado");

        await this.userRepository.activeAccout( user );

        return {
            code: 200,
            status: "OK",
            message: "la cuenta ha sido activada de manera exitosa!!"
        }
    }
}