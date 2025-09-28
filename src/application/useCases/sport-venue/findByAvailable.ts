import { ISportVenue } from "@/data/models";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";


/**
 * Caso de uso: Buscar escenarios deportivos filtrados por disponibilidad.
 *
 * Esta clase implementa la lógica de aplicación para recuperar todos los
 * espacios deportivos que se encuentren disponibles o no, según el valor
 * proporcionado en el parámetro `available`.
 *
 * Forma parte de la capa de aplicación en la arquitectura
 * hexagonal (o clean architecture).
 *
 * @class FindByAvailableSportVenueUseCase
 */
export class FindByAvailableSportVenueUseCase {

    /**
     * Inicializa el caso de uso con el repositorio de escenarios deportivos.
     *
     * @param {SportVenueRepository} sportRepository Repositorio que define las operaciones de acceso a datos.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    /**
     * Ejecuta el caso de uso de búsqueda filtrada por disponibilidad.
     *
     * @param {boolean} available `true` para buscar escenarios disponibles, `false` para no disponibles.
     * @returns {Promise<IResponse<ISportVenue[]>>} Una promesa que resuelve un objeto de respuesta estándar con:
     * - `code`: código HTTP (200 si es exitoso).
     * - `status`: estado de la operación.
     * - `message`: descripción breve del resultado.
     * - `data`: listado de escenarios deportivos encontrados según el filtro.
     */
    public async execute( available: boolean ): Promise<IResponse<ISportVenue[]>>{
        const sports = await this.sportRepository.findByAvailable( available );

        return {
            code: 200,
            status: "OK",
            message: "registros encontrados",
            data: sports
        }
    }
}