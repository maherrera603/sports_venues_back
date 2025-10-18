import { IReservation } from "@/data/models";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository } from "@/domain/repositories";


/**
 * @class FindReservationUseCase
 * @description
 * Caso de uso encargado de obtener el listado completo de reservas registradas en el sistema.
 * 
 * Este caso de uso actúa como intermediario entre la capa de infraestructura (fuente de datos)
 * y la capa de presentación (controladores o endpoints), garantizando una respuesta estandarizada.
 */
export class FindReservationUseCase {

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de gestionar las operaciones sobre reservas.
     */
    constructor( private readonly reservationRepository: IReservationRepository){}

    /**
     * Ejecuta la obtención del listado de todas las reservas existentes.
     * 
     * Este método recupera todas las reservas almacenadas en la fuente de datos
     * mediante el repositorio y las retorna en un formato estandarizado.
     * 
     * @async
     * @returns {Promise<IResponse<IReservation[]>>} Objeto con el listado de reservas y metadatos de respuesta.
     * 
     * @example
     * const useCase = new FindReservationUseCase(reservationRepository);
     * const response = await useCase.execute();
     * console.log(response.data); // Muestra todas las reservas
     */
    public async execute(): Promise<IResponse<IReservation[]>>{

        const reservations = await this.reservationRepository.find();

        return {
            code: 200,
            status: "OK",
            message: "Listado de reservas",
            data: reservations
        }
    }
}