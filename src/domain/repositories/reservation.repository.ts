import { IReservation } from "@/data/models";


/**
 * @interface IReservationRepository
 * @description
 * Define el contrato que deben implementar los repositorios encargados de gestionar las operaciones
 * de persistencia relacionadas con las **reservaciones**.
 * 
 * Esta interfaz actúa como un **puerto de salida** dentro de la arquitectura hexagonal,
 * permitiendo desacoplar la lógica del dominio de la infraestructura de datos
 * (ya sea una base de datos relacional, MongoDB u otra fuente).
 */
export interface IReservationRepository {

    /**
     * Obtiene todas las reservaciones registradas en el sistema.
     * 
     * @returns {Promise<IReservation[]>} Lista completa de reservaciones.
     */
    find():Promise<IReservation[]>;

    /**
     * Busca todas las reservaciones asociadas a un usuario específico.
     * 
     * @param {string | number} user - Identificador único del usuario.
     * @returns {Promise<IReservation[]>} Lista de reservaciones del usuario.
     */
    findByUser( user: string|number):Promise<IReservation[]>;

    /**
     * Busca una reservación por su identificador único.
     * 
     * @param {string | number} id - ID de la reservación.
     * @returns {Promise<IReservation | null>} Reservación encontrada o `null` si no existe.
     */
    findById(id: string|number): Promise<IReservation|null>;

    /**
     * Busca una reservación específica asociada a un usuario determinado.
     * 
     * @param {string | number} id - ID de la reservación.
     * @param {string | number} id_user - ID del usuario.
     * @returns {Promise<IReservation | null>} Reservación si pertenece al usuario o `null` en caso contrario.
     */
    findByIdByUser( id: string|number, id_user: string | number): Promise<IReservation|null>;

    /**
     * Obtiene todas las reservaciones realizadas en un espacio deportivo específico.
     * 
     * @param {string | number} id - ID del espacio deportivo.
     * @returns {Promise<IReservation[]>} Lista de reservaciones del espacio.
     */
    findBySportVenue( id: string|number): Promise<IReservation[]>;

    /**
     * Obtiene todas las reservaciones de un usuario en un espacio deportivo determinado.
     * 
     * @param {string | number} id - ID del espacio deportivo.
     * @param {string | number} user - ID del usuario.
     * @returns {Promise<IReservation[]>} Reservaciones del usuario en ese espacio.
     */
    findBySportVenueAndUser( id: string|number, user: string|number): Promise<IReservation[]>;

    /**
     * Crea una nueva reservación en el sistema.
     * 
     * @param {IReservation} reservation - Datos de la reservación a registrar.
     * @returns {Promise<IReservation>} Reservación creada con su información completa.
     */
    create( resevation: IReservation ): Promise<IReservation>;

    /**
     * Actualiza la información de una reservación existente.
     * 
     * @param {string | number} id - ID de la reservación.
     * @param {IReservation} reservation - Datos actualizados de la reservación.
     * @returns {Promise<IReservation>} Reservación actualizada.
     */
    update( id: string|number, reservation:IReservation): Promise<IReservation>;

    /**
     * Realiza una eliminación lógica (soft delete) de una reservación,
     * marcándola como inactiva sin eliminarla físicamente de la base de datos.
     * 
     * @param {string | number} id - ID de la reservación.
     * @returns {Promise<boolean>} `true` si la operación fue exitosa.
     */
    deleteSoft( id: string|number): Promise<boolean>;

    /**
     * Elimina permanentemente una reservación de la base de datos.
     * 
     * @param {string | number} id - ID de la reservación.
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa.
     */
    delete( id: string|number): Promise<boolean>;
}