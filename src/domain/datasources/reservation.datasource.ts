import { IReservation, IUser } from "@/data/models";


/**
 * @interface IReservationDatasource
 * @description
 * Define los métodos que deben implementarse para interactuar con la fuente de datos
 * (base de datos o cualquier otro almacenamiento) relacionada con las reservas.
 *
 * Esta interfaz actúa como un puerto de salida dentro de la arquitectura hexagonal,
 * lo que permite cambiar la implementación de la fuente de datos sin afectar el dominio.
 */
export interface IReservationDatasource {
    /**
     * Obtiene todas las reservas registradas en el sistema.
     * @returns {Promise<IReservation[]>} Lista de todas las reservas.
     */
    find():Promise<IReservation[]>;

    /**
     * Obtiene todas las reservas asociadas a un usuario específico.
     * @param {string | number} user - Identificador único del usuario.
     * @returns {Promise<IReservation[]>} Lista de reservas del usuario.
     */
    findByUser( user: string|number):Promise<IReservation[]>;

    /**
     * Busca una reserva por su identificador único.
     * @param {string | number} id - ID de la reserva.
     * @returns {Promise<IReservation | null>} La reserva encontrada o null si no existe.
     */
    findById(id: string|number): Promise<IReservation|null>;

    /**
     * Busca una reserva por su ID y por el ID del usuario propietario.
     * @param {string | number} id - ID de la reserva.
     * @param {string | number} id_user - ID del usuario que creó la reserva.
     * @returns {Promise<IReservation | null>} La reserva encontrada o null si no pertenece al usuario.
     */
    findByIdByUser( id: string|number, id_user: string | number): Promise<IReservation|null>;

    /**
     * Obtiene todas las reservas asociadas a un espacio deportivo específico.
     * @param {string | number} id - ID del espacio deportivo.
     * @returns {Promise<IReservation[]>} Lista de reservas del espacio deportivo.
     */
    findBySportVenue( id: string|number): Promise<IReservation[]>;

    /**
     * Obtiene todas las reservas realizadas por un usuario en un espacio deportivo específico.
     * @param {string | number} id - ID del espacio deportivo.
     * @param {string | number} user - ID del usuario.
     * @returns {Promise<IReservation[]>} Lista de reservas del usuario en ese espacio deportivo.
     */
    findBySportVenueAndUser( id: string|number, user: string|number): Promise<IReservation[]>;

    /**
     * Crea una nueva reserva en la fuente de datos.
     * @param {IReservation} reservation - Datos de la reserva a crear.
     * @returns {Promise<IReservation>} La reserva creada.
     */
    create( resevation: IReservation ): Promise<IReservation>;

    /**
     * Actualiza una reserva existente.
     * @param {string | number} id - ID de la reserva a actualizar.
     * @param {IReservation} reservation - Nuevos datos de la reserva.
     * @returns {Promise<IReservation>} La reserva actualizada.
     */
    update( id: string|number, reservation:IReservation): Promise<IReservation>;

    /**
     * Realiza un borrado lógico de una reserva (soft delete),
     * cambiando su estado a "cancelled" en lugar de eliminarla físicamente.
     * @param {string | number} id - ID de la reserva a cancelar.
     * @returns {Promise<boolean>} `true` si la operación fue exitosa.
     */
    deleteSoft( id: string|number): Promise<boolean>;

    /**
     * Elimina una reserva permanentemente de la fuente de datos.
     * @param {string | number} id - ID de la reserva a eliminar.
     * @returns {Promise<boolean>} `true` si la reserva fue eliminada exitosamente.
     */
    delete( id: string|number): Promise<boolean>;
}