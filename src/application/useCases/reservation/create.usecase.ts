import { IReservation } from "@/data/models";
import { Role } from "@/domain/enum";
import { IResponse } from "@/domain/interfaces";
import { IReservationRepository, UserRepository } from "@/domain/repositories";



/**
 * @class CreateReservationUseCase
 * @description
 * Caso de uso responsable de crear una nueva reserva en el sistema.
 * 
 * Este caso de uso sigue los principios de la arquitectura hexagonal,
 * donde se interactúa con los repositorios del dominio para orquestar la lógica
 * de negocio sin depender directamente de la infraestructura.
 */
export class CreateReservationUseCase{


    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio encargado de manejar las operaciones sobre reservas.
     * @param {UserRepository} userRepository - Repositorio encargado de obtener información de los usuarios.
     */
    constructor( private readonly reservationRepository: IReservationRepository, private readonly userRepository: UserRepository ){}


    /**
     * Ejecuta el proceso de creación de una reserva.
     * 
     * Este método asigna automáticamente a un administrador como responsable
     * de la reserva y luego registra la información en la fuente de datos.
     * 
     * @async
     * @param {IReservation} data - Datos de la reserva a crear.
     * @returns {Promise<IResponse<IReservation>>} Respuesta estándar con la información de la reserva creada.
     * 
     * @throws {CustomError} Si ocurre un error interno durante la creación o al buscar el administrador.
     */
    public async execute( data: IReservation ): Promise<IResponse<IReservation>>{

        const admin = await this.userRepository.findByRole( Role.ADMIN_ROLE );
        
        data.user = admin!.id!

        const reservation = await this.reservationRepository.create( data );

        //TODO: enviar correo al usuario o administrador de la reserva


        return {
            code: 201,
            status: "created",
            message: "solicitud enviada con exito!!",
            data: reservation
        }
    }
}