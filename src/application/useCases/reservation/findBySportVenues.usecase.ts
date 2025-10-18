import { IReservation, IUser } from "@/data/models";
import { Role } from "@/domain/enum";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";


/**
 * @class FindBySportVenueReservationUseCase
 * @description
 * Caso de uso responsable de obtener todas las reservaciones asociadas
 * a un espacio deportivo específico (Sport Venue).
 * 
 * Este caso de uso controla el acceso según el rol del usuario:
 * - **ADMIN_ROLE:** puede visualizar todas las reservaciones del espacio deportivo.
 * - **USER_ROLE:** solo puede visualizar las reservaciones realizadas por el propio usuario.
 * 
 * Forma parte de la capa de dominio en la arquitectura hexagonal,
 * delegando la persistencia de datos al repositorio `IReservationRepository`.
 */
export class FindBySportVenueReservationUseCase {

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de manejar las operaciones de acceso a datos relacionadas con las reservaciones.
     */
    constructor( private readonly reservationRepository: IReservationRepository){}

    /**
     * @method execute
     * @async
     * @description
     * Obtiene todas las reservaciones asociadas a un espacio deportivo.
     * 
     * La visibilidad de las reservaciones depende del rol del usuario autenticado:
     * - **Administrador (ADMIN_ROLE):** puede ver todas las reservaciones del espacio deportivo.
     * - **Usuario regular:** solo puede ver las reservaciones que él mismo ha realizado en ese espacio deportivo.
     * 
     * @param {string | number} id - Identificador único del espacio deportivo (Sport Venue).
     * @param {IUser} user - Usuario autenticado que solicita la información.
     * 
     * @returns {Promise<IResponse<IReservation[]>>} Objeto con el estado, mensaje y las reservaciones encontradas.
     */
    public async execute( id: string | number, user: IUser): Promise<IResponse<IReservation[]>>{

        const reservations = ( user.role === Role.ADMIN_ROLE)
                            ? await this.reservationRepository.findBySportVenue( id )
                            : await this.reservationRepository.findBySportVenueAndUser( id, user.id!);


        return {
            code: 200,
            status: "Ok",
            message: "reservas agendadas a este espacio deportivo",
            data: reservations
        }
    }
}