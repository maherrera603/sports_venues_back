import { IUser } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { UserRepository } from "@/domain/repositories";


/**
 * Caso de uso para la actualización de un usuario existente.
 *
 * Se encarga de orquestar la lógica de negocio necesaria para 
 * verificar la existencia de un usuario y actualizar sus datos 
 * en el repositorio correspondiente.
 */
export class UpdateUserUseCase {

    /**
     * @param userRespository Repositorio de usuarios encargado de la persistencia.
     */
    constructor( private readonly userRespository: UserRepository ){}


    /**
     * Ejecuta la actualización de un usuario.
     *
     * Pasos:
     * 1. Verifica si el usuario existe en el repositorio por su `id`.
     * 2. Si no existe, lanza un error `CustomError.notFound`.
     * 3. Si existe, actualiza los datos del usuario.
     * 4. Retorna una respuesta estándar con código, estado, mensaje y el usuario actualizado.
     *
     * @param user Objeto de tipo `IUser` con los datos a actualizar.
     * @returns Una promesa que resuelve a un `IResponse<IUser>` con los datos del usuario actualizado.
     * 
     * @throws {CustomError.notFound} Si el usuario no existe en el repositorio.
     */
    public async execute( user: IUser ):Promise<IResponse<IUser>> {

        const exists = await this.userRespository.findUserById( String( user.id ));
        if( !exists ) throw CustomError.notFound("El Usuario no existe");

        const update = await this.userRespository.updateUser( user );

        return {
            code: 200,
            status: "OK",
            message: "los datos del usuario han sido actualizados!!",
            data: update
        }
    }

}