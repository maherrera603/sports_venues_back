import { IReservation } from "@/data/models";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";

/**
 * @class FindByUserReservationUserCase
 * @description
 * Caso de uso encargado de obtener todas las reservas asociadas a un usuario específico.
 * 
 * Este caso de uso consulta el repositorio de reservas para devolver
 * únicamente aquellas que pertenecen al usuario autenticado o identificado por su ID.
 */
export class FindByUserReservationUserCase{

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de las operaciones sobre reservas.
     */
    constructor( private readonly reservationRepository: IReservationRepository ){}


    /**
     * Ejecuta la búsqueda de todas las reservas pertenecientes a un usuario.
     * 
     * Este método interactúa con la capa de repositorio para obtener las reservas filtradas
     * por el identificador del usuario proporcionado.
     * 
     * @async
     * @param {string | number} user - Identificador único del usuario (ID o UUID) cuyas reservas se desean consultar.
     * @returns {Promise<IResponse<IReservation[]>>} Objeto de respuesta con la lista de reservas del usuario.
     */
    public async execute( user: string |number): Promise<IResponse<IReservation[]>>{

        const reservations = await this.reservationRepository.findByUser( user );

        return {
            code: 200,
            status: "ok",
            message: "Listado de reservaciones",
            data: reservations
        }
    }
}