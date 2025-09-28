import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { UserRepository } from "@/domain/repositories";

/**
 * Caso de uso responsable de eliminar un usuario existente en el sistema.
 */
export class DeleteUserUseCase {

    /**
     * Inicializa el caso de uso con un repositorio de usuarios.
     * 
     * @param userRespository - Implementación del repositorio de usuarios.
     */
    constructor( private readonly userRespository: UserRepository ){}


    /**
     * Ejecuta el proceso de eliminación de un usuario.
     *
     * @param id - Identificador único del usuario a eliminar.
     * @returns {Promise<IResponse>} Respuesta estandarizada con el resultado de la operación.
     * 
     * @throws {CustomError.notFound} Si el usuario no existe en la base de datos.
     */
    public async execute( id: string | number  ):Promise<IResponse> {
        const exists = await this.userRespository.findUserById( String( id ));
        if( !exists ) throw CustomError.notFound("el usuario no existe");

        this.userRespository.deleteUser( id );

        return {
            code: 200,
            status: "OK",
            message: "la cuenta ha sido eliminada",
        }
    }
}