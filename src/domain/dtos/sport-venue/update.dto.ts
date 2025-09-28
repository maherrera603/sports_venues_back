import { Validator } from "@/application/validations";
import { ISportVenue } from "@/data/models";

interface IFields {
    name: string;
    venue: string;
    available: boolean;
    userId: string;
}


/**
 * DTO (Data Transfer Object) para la actualización de escenarios deportivos.
 *
 * Esta clase centraliza y valida los datos de entrada antes de actualizar
 * un registro de tipo `ISportVenue`. 
 */
export class UpdateSportVenueDTO {


     /**
     * Valida los campos recibidos para la actualización de un escenario deportivo.
     *
     * Reglas de validación:
     * - **name**: requerido, mínimo 3 caracteres, solo letras.
     * - **venue**: requerido, mínimo 3 caracteres, formato de dirección válido según `Validator.address`.
     * - **userId**: requerido.
     * - **available**: opcional, por defecto `false`.
     *
     * @param fields Objeto con los datos a validar (`name`, `venue`, `available`, `userId`).
     * @returns Una tupla con:
     * - `[0]`: mensaje de error si la validación falla, `undefined` si es válida.
     * - `[1]`: objeto `ISportVenue` construido si los datos son válidos.
     */
    public static validate_fields( fields: IFields ): [string | undefined, ISportVenue?] {
        const { name, venue, available = false, userId } = fields;


        if(!name) return [ "el nombre del campo es requerido"];

        if( Validator.less_than( name, 3)) return ["el nombre del campo debe tener mas de 3 caracteres"];

        if( !Validator.text.test( name )) return [ "el nombre del campo debe contener solo letras" ];


        if(!venue) return [ "el nombre del campo es requerido"];

        if( Validator.less_than( venue, 3)) return ["el nombre del campo debe tener mas de 3 caracteres"];

        if( !Validator.address.test( venue )) return [ "la direccion es invalida" ];


        if( !userId ) return [ "el userId es requerido" ];


        return [ undefined, { name, venue, available, userId } as ISportVenue ];
    }
}