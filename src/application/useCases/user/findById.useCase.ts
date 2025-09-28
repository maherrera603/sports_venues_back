import { IUser } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { UserRepository } from "@/domain/repositories";



/**
 * Caso de uso para la consulta de un usuario por su identificador único.
 *
 * Encapsula la lógica de negocio necesaria para recuperar
 * los datos de un usuario almacenado en el repositorio.
 */
export class FindUserByIdUseCase {

    /**
     * @param userRepository Repositorio de usuarios encargado de la persistencia.
     */
    constructor( private readonly userRepository: UserRepository){}


    /**
     * Ejecuta la búsqueda de un usuario por su `id`.
     *
     * Pasos:
     * 1. Consulta el repositorio de usuarios con el `id` proporcionado.
     * 2. Si no se encuentra, lanza un error `CustomError.notFound`.
     * 3. Si existe, retorna una respuesta estándar con la información del usuario.
     *
     * @param id Identificador único del usuario a buscar.
     * @returns Una promesa que resuelve a un `IResponse<IUser>` con los datos del usuario encontrado.
     *
     * @throws {CustomError.notFound} Si el usuario no existe en el repositorio.
     */
    public async execute( id: string ):Promise<IResponse<IUser>>{

        const user = await this.userRepository.findUserById( id );
        if( !user ) throw CustomError.notFound("los datos del usuario no fueron encontrados");

        return {
            code: 200,
            status: "OK",
            message: "datos del usuario",
            data: user
        }
    }
}