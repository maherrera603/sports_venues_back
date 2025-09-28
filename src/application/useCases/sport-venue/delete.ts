import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";


/**
 * Caso de uso: Eliminar un escenario deportivo por su identificador.
 *
 * Esta clase implementa la lógica de aplicación para eliminar un
 * espacio deportivo específico del sistema. Antes de realizar la
 * eliminación, valida que el registro exista en la base de datos.
 *
 * Si no existe un registro con el `id` proporcionado, se lanza
 * un error controlado mediante `CustomError.notFound`.
 *
 * Forma parte de la capa de aplicación en la arquitectura
 * hexagonal (o clean architecture).
 *
 * @class DeleteSportVenueUseCase
 */
export class DeleteSportVenueUseCase {

    /**
     * Inicializa el caso de uso con el repositorio de escenarios deportivos.
     *
     * @param {SportVenueRepository} sportRepository Repositorio que define las operaciones de acceso a datos.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    /**
     * Ejecuta el caso de uso de eliminación.
     *
     * @param {string | number} id Identificador único del escenario deportivo a eliminar.
     * @returns {Promise<IResponse>} Una promesa que resuelve un objeto de respuesta estándar con:
     * - `code`: código HTTP (200 si la operación es exitosa).
     * - `status`: estado de la operación.
     * - `message`: confirmación de la eliminación.
     *
     * @throws {CustomError} Si no se encuentra un escenario con el `id` proporcionado.
     */
    public async execute( id: string | number):Promise<IResponse>{
        const sport = await this.sportRepository.findById( id );
        if( !sport ) throw CustomError.notFound(`el registro con el id: ${id} no existe`);

        await this.sportRepository.deleteSportVenue( id );

        return {
            code: 200,
            status: "OK",
            message: "registro eliminado con exito!!"
        }
    }
}