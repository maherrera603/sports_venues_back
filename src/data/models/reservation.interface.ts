import { ISportVenue , IUser} from "@/data/models"

/**
 * @interface IReservation
 * @description
 * Representa la estructura de una reserva dentro del sistema.
 * 
 * Esta interfaz define los campos necesarios para gestionar las reservas
 * de espacios deportivos o instalaciones, incluyendo información sobre el
 * usuario, el horario, el estado y los metadatos de creación/actualización.
 */
export interface IReservation {
    /**
     * Identificador único de la reserva.
     * Puede ser un número (en bases de datos SQL) o un string (en bases NoSQL como MongoDB).
     */
    id?: string|number;

    /**
     * Fecha en la que se realiza la reserva.
     * Representa el día en el que el usuario solicita el espacio.
     */
    date_reservation?: Date;

    /**
     * Estado actual de la reserva.
     * Ejemplos: `"pendiente"`, `"confirmada"`, `"cancelada"`.
     */
    status?: string;

    /**
     * Número total de horas reservadas.
     */
    hours?: number;

    /**
     * Hora de inicio de la reserva, en formato de 24 horas (por ejemplo, `"08:00"`).
     */
    hour_initial?: string;

    /**
     * Hora de finalización de la reserva, en formato de 24 horas (por ejemplo, `"10:00"`).
     */
    hour_finish?: string;
    
    /**
     * Identificador del escenario o espacio deportivo reservado.
     * Puede ser un número o un string dependiendo de la base de datos utilizada.
     */
    sports_venue?: number| string | ISportVenue;

    /**
     * Indica si la reserva ha sido confirmada.
     * `true` si fue confirmada, `false` si aún está pendiente.
     */
    confirm_reservation?: boolean;

    /**
     * Identificador del usuario destinatario (en caso de reserva hacia otro usuario).
     */
    to_user?: string | number | IUser;

    /**
     * Identificador del usuario que realizó la reserva.
     */
    user?: string| number | IUser;

    /**
     * Fecha en la que se creó el registro de la reserva.
     */
    created_at?: Date;

     /**
     * Fecha en la que se actualizó por última vez la reserva.
     */
    updated_at?: Date;
}