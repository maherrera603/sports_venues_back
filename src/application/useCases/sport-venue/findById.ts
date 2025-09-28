import { ISportVenue } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";


/**
 * Caso de uso: Buscar un escenario deportivo por su identificador único.
 *
 * Esta clase implementa la lógica de aplicación para consultar un espacio
 * deportivo específico, delegando la búsqueda a la capa de repositorios.
 *
 * Si el registro no existe, se lanza un error controlado mediante `CustomError.notFound`.
 *
 * Forma parte de la capa de aplicación en la arquitectura
 * hexagonal (o clean architecture).
 *
 * @class FindByIdSportVenueUseCase
 */
export class FindByIdSportVenueUseCase {

    /**
     * Inicializa el caso de uso con el repositorio de escenarios deportivos.
     *
     * @param {SportVenueRepository} sportRepository Repositorio que define las operaciones de acceso a datos.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    /**
     * Ejecuta el caso de uso de búsqueda por ID.
     *
     * @param {string | number} id Identificador único del escenario deportivo.
     * @returns {Promise<IResponse<ISportVenue>>} Una promesa que resuelve un objeto de respuesta estándar con:
     * - `code`: código HTTP (200 si es exitoso).
     * - `status`: estado de la operación.
     * - `message`: descripción breve del resultado.
     * - `data`: escenario deportivo encontrado.
     *
     * @throws {CustomError} Si no se encuentra un escenario con el ID proporcionado.
     */
    public async execute( id:string |number ): Promise<IResponse<ISportVenue>>{

        const sport = await this.sportRepository.findById( id );
        if( !sport ) throw CustomError.notFound(`el registro con id: ${id} no fue encontrado`);


        return {
            code: 200,
            status: "OK",
            message: "registro encontrado",
            data: sport
        }
    }
}