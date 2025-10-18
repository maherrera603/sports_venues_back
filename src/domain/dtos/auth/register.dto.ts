import { Validator } from "@/application/validations";
import { IUser } from "@/data/models";
import { Role } from "@/domain/enum";


/**
 * @interface IFields
 * @description
 * Define la estructura de los campos requeridos para registrar un usuario en el sistema.
 */
interface IFields {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    role: Role
}


/**
 * @class AuthRegisterDTO
 * @description
 * DTO (Data Transfer Object) encargado de validar los campos requeridos
 * durante el proceso de registro de un nuevo usuario.  
 * 
 * Realiza comprobaciones de formato, longitud mínima y reglas de negocio
 * antes de permitir la creación del usuario.
 */
export class AuthRegisterDTO {

    /**
     * Valida los campos ingresados por el usuario al momento del registro.
     * 
     * Este método evalúa que los datos cumplan con las reglas de validación definidas
     * en la clase `Validator` (como longitud mínima, formato de email, estructura de contraseña, etc.).
     * 
     * Si algún campo no cumple con los requisitos, retorna un mensaje de error.
     * Si todo es correcto, retorna un objeto de tipo `IUser` listo para su persistencia.
     * 
     * @static
     * @param {IFields} fields - Objeto con los campos ingresados por el usuario.
     * @returns {[string | undefined, IUser?]} 
     * Una tupla donde:
     * - El primer valor es un mensaje de error (si existe).
     * - El segundo valor es el usuario validado (si los datos son correctos).
     */
    public static validate_fields( fields: IFields): [ string | undefined, IUser? ] {

        const { name, lastname, phone, email, password, role = Role.USER_ROLE } = fields;

        if( Validator.less_than( name, 3) ) return [ "el campo nombre debe contener mas de 3 caracteres" ];

        if( !Validator.text.test(name)) return [ "ingrese nombres validos" ];

        if( Validator.less_than( lastname, 3) ) return [ "el campo apellidos debe contener mas de 3 caracteres" ];

        if( !Validator.text.test(lastname)) return [ "ingrese apellidos validos" ];

        if( Validator.less_than( phone, 10) ) return [ "el campo telefono debe contener 10 digitos" ];

        if( !Validator.number.test(phone)) return [ "ingrese un numero telefonico valido" ];

        if( Validator.greater_than( phone, 10) ) return [ "el campo telefono debe contener 10 digitos" ];

        if( !Validator.email.test(email) ) return [ "ingrese un correo valido" ];

        if( Validator.less_than( password, 8 )) return [ "la contraseña debe contener mas de 8 caracteres" ];

        if( !Validator.password.test( password ) ) return [ "La contraseña debe contener: <br> 1. una letra en mayuscula <br> 2. un digito <br> 3. un caracter especial" ];

        if( Validator.greater_than( password, 12) ) return [ "la contaseña debe contener menos de 12 caracteres" ];

        const user = {...fields, role} as IUser;

        return [ undefined,  user ];
    }

}