import { Validator } from "@/application/validations";
import { ISportVenue } from "@/data/models";

interface IFields {
    name: string;
    venue: string;
}

/**
 * DTO (Data Transfer Object) para la creación de un escenario deportivo.
 *
 * Esta clase encapsula la lógica de validación de los campos necesarios
 * para registrar un nuevo `SportVenue`. Garantiza que los datos
 * cumplan con las reglas mínimas antes de enviarse a la capa de dominio
 * o persistencia.
 *
 * Validaciones aplicadas:
 * - `name`: obligatorio, mínimo 3 caracteres, solo letras.
 * - `venue`: obligatorio, mínimo 3 caracteres, solo letras.
 *
 * Si la validación es exitosa, retorna un objeto `ISportVenue` listo
 * para ser utilizado en el flujo de negocio.
 *
 * @class CreateSportVenueDTO
 */
export class CreateSportVenueDTO {


    /**
     * Valida los campos requeridos para la creación de un espacio deportivo.
     *
     * @param {IFields} fields Objeto con los campos `name` y `venue` a validar.
     * @returns {[string | undefined, ISportVenue?]} Una tupla donde:
     * - El primer valor es un mensaje de error (`string`) si la validación falla, o `undefined` si pasa.
     * - El segundo valor es un objeto `ISportVenue` construido si los datos son válidos.
     */
    public static validate_fields( { name, venue }: IFields ): [string | undefined, ISportVenue?]{

        if(!name) return [ "el nombre del campo es requerido"];

        if( Validator.less_than( name, 3)) return ["el nombre del campo debe tener mas de 3 caracteres"];

        if( !Validator.text.test( name )) return [ "el nombre del campo debe contener solo letras" ];


        if(!venue) return [ "el nombre del campo es requerido"];

        if( Validator.less_than( venue, 3)) return ["el nombre del campo debe tener mas de 3 caracteres"];

        if( !Validator.address.test( venue )) return [ "la direccion es invalida" ];

        const sportVenue = { name, venue, available: true} as ISportVenue;

        return [ undefined, sportVenue ];
    }
}