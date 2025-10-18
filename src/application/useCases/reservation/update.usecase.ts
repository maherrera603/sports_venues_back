import { IReservation } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";


/**
 * @class UpdateReservationUseCase
 * @description
 * Caso de uso encargado de actualizar la información de una reservación existente.
 * 
 * Este caso de uso se asegura de que la reservación exista antes de proceder con la actualización.
 * Si no se encuentra la reservación, se lanza un error `CustomError.notFound`.
 * 
 * Forma parte de la capa de dominio dentro de la arquitectura hexagonal,
 * delegando las operaciones de persistencia al repositorio `IReservationRepository`.
 */
export class UpdateReservationUseCase {

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de manejar las operaciones de acceso y modificación de datos de reservaciones.
     */
    constructor( private readonly reservationRepository: IReservationRepository ) {}


    /**
     * @method execute
     * @async
     * @description
     * Actualiza una reservación existente con los nuevos datos proporcionados.
     * 
     * El método primero valida si la reservación existe en el sistema.
     * Si no existe, se lanza un error `CustomError.notFound`.  
     * Si existe, se actualizan sus datos mediante el repositorio.
     * 
     * @param {string | number} id - Identificador único de la reservación a actualizar.
     * @param {IReservation} data - Objeto que contiene los datos actualizados de la reservación.
     * 
     * @returns {Promise<IResponse<IReservation>>} Objeto de respuesta con el estado, mensaje y la reservación actualizada.
     * 
     * @throws {CustomError} Si la reservación no existe.
     */
    public async execute( id: string|number, data: IReservation ): Promise<IResponse<IReservation>>{

        const exists = await this.reservationRepository.findById( id );
        if(!exists) throw CustomError.notFound("la reservacion no existe o no se encontro");

        const reservation = await this.reservationRepository.update(id, data);

        return {
            code: 200,
            status: "Ok",
            message: "la reservacion ha sido actualizada",
            data: reservation
        }
    }
}