import { IReservation, IUser } from "@/data/models";
import { Role } from "@/domain/enum";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";



/**
 * @class FindByIdReservationUseCase
 * @description
 * Caso de uso encargado de obtener la información de una reservación específica,
 * validando el rol del usuario que realiza la solicitud.
 * 
 * Si el usuario posee el rol de administrador (`ADMIN_ROLE`), puede consultar cualquier reservación.
 * En caso contrario, solo podrá consultar las reservaciones asociadas a su propio usuario.
 * 
 * Este caso de uso sigue el principio de separación de responsabilidades dentro
 * de la arquitectura hexagonal (Domain Layer), delegando la persistencia al
 * repositorio `IReservationRepository`.
 */
export class FindByIdReservationUseCase{

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de manejar las operaciones de acceso a datos de reservaciones.
     */
    constructor( private readonly reservationRepository: IReservationRepository  ){}



    /**
     * @method execute
     * @async
     * @description
     * Busca una reservación por su identificador (`id`), verificando si el usuario
     * tiene permisos para acceder a la información.
     * 
     * - Si el usuario es **administrador**, puede obtener cualquier reservación.
     * - Si el usuario es **regular**, solo podrá acceder a sus propias reservaciones.
     * 
     * En caso de que no se encuentre la reservación, se lanza un error `CustomError.notFound`.
     * 
     * @param {string | number} id - Identificador único de la reservación a consultar.
     * @param {IUser} user - Usuario autenticado que realiza la consulta.
     * 
     * @returns {Promise<IResponse<IReservation>>} Objeto de respuesta con el estado, mensaje y datos de la reservación encontrada.
     * 
     * @throws {CustomError} Si la reservación no existe o el usuario no tiene permisos para verla.
     */
    public async execute( id: string | number, user: IUser ):Promise<IResponse<IReservation>>{

        const reservation = ( user.role === Role.ADMIN_ROLE) 
                        ? await this.reservationRepository.findById( id )
                        : await this.reservationRepository.findByIdByUser( id, user.id! );

        if( !reservation ) throw CustomError.notFound(`la reservacion con el id ${ id} no fue encontrada`);

        return {
            code: 200,
            status: "OK",
            message: "informacion de la reservacion",
            data: reservation
        }
    }

}