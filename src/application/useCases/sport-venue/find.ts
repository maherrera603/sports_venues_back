import { ISportVenue } from "@/data/models";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";

/**
 * Caso de uso: Obtener el listado de escenarios deportivos.
 *
 * Esta clase implementa la lógica de aplicación para recuperar
 * todos los espacios deportivos registrados en el sistema,
 * delegando la consulta a la capa de repositorios.
 *
 * Forma parte de la capa de aplicación en la arquitectura
 * hexagonal (o clean architecture).
 *
 * @class FindSportsVenue
 */
export class FindSportsVenueUseCase {

    /**
     * Inicializa el caso de uso con el repositorio de escenarios deportivos.
     *
     * @param {SportVenueRepository} sportRepository Repositorio que define las operaciones de acceso a datos.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    /**
     * Ejecuta el caso de uso de consulta.
     *
     * @returns {Promise<IResponse<ISportVenue[]>>} Una promesa que resuelve un objeto de respuesta estándar con:
     * - `code`: código HTTP (200 si es exitoso).
     * - `status`: estado de la operación.
     * - `message`: descripción breve del resultado.
     * - `data`: listado de escenarios deportivos encontrados.
     */
    public async execute(): Promise<IResponse<ISportVenue[]>>{

        const sports = await this.sportRepository.find();

        return {
            code: 200,
            status: "OK",
            message: "registros encontrados",
            data: sports
        }
    }
}