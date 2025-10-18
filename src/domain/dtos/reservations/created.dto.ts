import { Validator } from "@/application/validations";
import { IReservation } from "@/data/models";


/**
 * Interfaz que define los campos requeridos para crear una reserva.
 */
interface IFields {
    date_reservation: string;
    hours: number;
    hour_initial: string;
    hour_finish: string;
    sports_venue: string;
}



/**
 * Clase encargada de validar los datos de entrada para crear una nueva reserva.
 * 
 * Esta clase actúa como un **Data Transfer Object (DTO)**, encargándose
 * de verificar que todos los campos requeridos estén presentes y cumplan
 * con el formato correcto antes de ser enviados al dominio.
 */
export class CreateReservationDTO {


    /**
     * Valida los campos requeridos para crear una reserva.
     * 
     * @param fields - Objeto que contiene los valores del formulario de reserva.
     * @returns Una tupla que puede contener:
     *  - `[string]` → Mensaje de error si la validación falla.
     *  - `[undefined, IReservation]` → Objeto válido de reserva si la validación es exitosa.
     */
    public static validate_fields( fields: IFields): [string|undefined, IReservation?] {

        const { date_reservation, hours, hour_initial, hour_finish, sports_venue } = fields;

        if( !date_reservation) return ["por favor, seleccione una fecha para la reservacion del lugar"];

        if( !Validator.date.test( date_reservation )) return [ "la fecha de reservation es incorrecta" ];

        if( !hours ) return ["ingrese la cantidad de hora de reserva"];

        if( !Validator.number.test( hours.toString() )) return ["el campo hora debe ser numerico"];

        if( !hour_initial) return [ "ingrese la hora inicial del lugar" ];

        if( !Validator.hour.test( hour_initial )) return ["la hora inicial debe ser hh:mm AM/PM"];
        
        if( !hour_finish ) return [ "ingrese la hora de finalizacion del lugar" ];

        if( !Validator.hour.test( hour_finish )) return ["la hora inicial debe ser hh:mm AM/PM"];

        if( !sports_venue ) return [ "seleccione el espacio deportivo"];

        return [ undefined, { date_reservation: new Date( date_reservation ), hours, hour_initial, hour_finish, sports_venue } ];
    }

}