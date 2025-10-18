import { Validator } from "@/application/validations";
import { IReservation } from "@/data/models";


/**
 * @interface IFields
 * @description
 * Define los campos requeridos para actualizar una reservación.
 */
interface IFields {
    date_reservation: string;
    hours: number;
    hour_initial: string;
    hour_finish: string;
    sports_venue: string;
}

/**
 * @class UpdateReservationDTO
 * @description
 * Objeto de Transferencia de Datos (DTO) encargado de validar los campos
 * recibidos para la actualización de una reservación.
 * 
 * Este DTO se encarga de:
 * - Validar la estructura y el tipo de los datos.
 * - Garantizar que todos los campos requeridos estén presentes.
 * - Convertir los datos en un objeto compatible con el modelo `IReservation`.
 * 
 * Forma parte de la capa **Application** dentro de la arquitectura hexagonal.
 */
export class UpdateReservationDTO {

    /**
     * @method validate_fields
     * @static
     * @description
     * Valida los campos de entrada para la actualización de una reservación.
     * 
     * En caso de que exista algún error en la validación, se devuelve un arreglo
     * con el mensaje correspondiente. Si la validación es exitosa, se retorna
     * el objeto `IReservation` listo para ser procesado.
     * 
     * @param {IFields} fields - Objeto con los campos enviados por el cliente para la actualización.
     * 
     * @returns {[string | undefined, IReservation?]} 
     * Una tupla donde:
     * - El primer valor es un mensaje de error (si existe).
     * - El segundo valor es el objeto `IReservation` válido (si la validación fue exitosa).
     */
    public static validate_fields( fields: IFields ):[string|undefined, IReservation?] {

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

        return [ undefined, { date_reservation: new Date( date_reservation ), hours, hour_initial, hour_finish, sports_venue, status: "confirm", confirm_reservation: true  } as IReservation ];
    }
    
}