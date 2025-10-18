import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";


/**
 * @class DeleteReservationUseCase
 * @description
 * Caso de uso encargado de eliminar una reservación existente del sistema.
 * 
 * Antes de eliminar, se valida que la reservación exista.  
 * Si no se encuentra, se lanza un error `CustomError.notFound`.
 * 
 * Este caso de uso forma parte de la capa de **Dominio** dentro de la arquitectura hexagonal,
 * y delega las operaciones de persistencia al repositorio `IReservationRepository`.
 */
export class DeleteReservationUseCase{

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de manejar las operaciones de acceso y modificación de datos de reservaciones.
     */
    constructor( private readonly reservationRepository: IReservationRepository ){}

    /**
     * @method execute
     * @async
     * @description
     * Elimina una reservación del sistema mediante su identificador único.
     * 
     * - Primero valida que la reservación exista.  
     * - Si no existe, lanza una excepción `CustomError.notFound`.  
     * - Si existe, procede a eliminarla mediante el repositorio.
     * 
     * @param {string | number} id - Identificador único de la reservación a eliminar.
     * 
     * @returns {Promise<IResponse>} Objeto de respuesta con el estado y mensaje de la operación.
     * 
     * @throws {CustomError} Si la reservación no existe.
     */
    public async execute( id: string | number): Promise<IResponse>{

        const exists = await this.reservationRepository.findById( id );
        if(!exists) throw CustomError.notFound("la reserva no se ha encontrado");

        await this.reservationRepository.delete(id);

        return {
            code: 200,
            status: "Ok",
            message: "la reserva ha sido eliminada"
        }
    }
}