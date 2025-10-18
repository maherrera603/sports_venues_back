import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";


/**
 * @class SoftDeleteReservationUseCase
 * @description
 * Caso de uso responsable de cancelar una reserva existente (eliminación lógica o "soft delete").
 * 
 * Este caso de uso valida que la reserva exista y que pertenezca al usuario autenticado antes de realizar la cancelación.
 * La cancelación no elimina el registro de la base de datos, sino que actualiza su estado interno mediante
 * el método `deleteSoft` del repositorio.
 */
export class SoftDeleteReservationUseCase{


    /**
     * Crea una instancia del caso de uso.
     * 
     * @param {IReservationRepository} reservationRepository - Repositorio de reservas que implementa las operaciones del dominio.
     */
    constructor( private readonly reservationRepository: IReservationRepository ){}


    /**
     * Ejecuta la operación de cancelación de una reserva (eliminación lógica).
     * 
     * @async
     * @param {string | number} id - Identificador único de la reserva a cancelar.
     * @param {string | number} user_id - Identificador del usuario que realiza la acción.
     * 
     * @returns {Promise<IResponse>} Un objeto con el estado de la operación, código HTTP y mensaje descriptivo.
     * 
     * @throws {CustomError.notFound} Si la reserva no existe o no pertenece al usuario especificado.
     */
    public async execute( id: string | number, user_id: string|number): Promise<IResponse>{

        const exists = await this.reservationRepository.findByIdByUser( id, user_id );
        if(!exists) throw CustomError.notFound("la reserva no se ha encontrado");


        if( exists.status === "cancelled") throw CustomError.badRequest("la reserva ya fue cancelada anteriormente");

        await this.reservationRepository.deleteSoft(id);

        return {
            code: 200,
            status: "Ok",
            message: "la reserva ha sido cancelada"
        }
    }
}