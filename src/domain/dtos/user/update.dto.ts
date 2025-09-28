import { Validator } from "@/application/validations";
import { IUser } from "@/data/models";

interface IFields {
    name: string;
    lastname: string;
    phone: string;
}

/**
 * DTO (Data Transfer Object) para actualizar un usuario.
 * 
 * Esta clase encapsula la validación de los campos que pueden ser
 * actualizados en un usuario, garantizando que cumplan con las
 * reglas de negocio antes de ser persistidos.
 */
export class UpdateUserDTO {


    /**
     * Valida los campos recibidos para la actualización de un usuario.
     * 
     * Reglas de validación:
     * - `name`: obligatorio, mínimo 3 caracteres, solo letras.
     * - `lastname`: obligatorio, mínimo 3 caracteres, solo letras.
     * - `phone`: obligatorio, exactamente 10 dígitos, solo números.
     * 
     * @param fields Objeto con los campos del usuario a actualizar.
     * @returns Una tupla donde:
     * - El primer valor es un `string` con el mensaje de error si la validación falla, o `undefined` si es válido.
     * - El segundo valor es un objeto `IUser` válido en caso de éxito.
     */
    public static validate_fields( fields: IFields): [ string | undefined, IUser? ] {
        const { name, lastname, phone } = fields;

        if(!name) return [ "los nombres son requeridos" ];
        
        if( Validator.less_than( name, 3 )) return [ "los nombres debe contener mas de 3 letras" ];

        if( !Validator.text.test( name )) return [ "los nombres debe contener solo letras" ];

        if(!lastname) return [ "los apellidos son requeridos" ];
        
        if( Validator.less_than( lastname, 3 )) return [ "los apellidos debe contener mas de 3 letras" ];

        if( !Validator.text.test( lastname )) return [ "los apellidos debe contener solo letras" ];

        if( !phone ) return [ "el numero de telefono es requerido" ];
        
        if( Validator.less_than( phone, 10 )) return [ "el numero de telefono debe contener 10 dijitos" ];

        if( !Validator.number.test( phone )) return [ "el numero de telefono debe contener solo digitos" ];

        if( Validator.greater_than( phone, 10 )) return [ "el numero de telefono debe contener 10 dijitos" ];

        return [ undefined, fields as IUser ];
    }
}