import { Validator } from "@/application/validations";
import { IUser } from "@/data/models";
import { Role } from "@/domain/enum";

interface IFields {
    email: string;
    password: string;

}


/**
 * DTO para la autenticación del CLI (usuario administrador por defecto).
 * 
 * - Valida los campos email y password.
 * - Retorna una tupla con:
 *   - `string` → mensaje de error si la validación falla.
 *   - `IUser` → objeto de usuario válido si pasa la validación.
 */
export class AuthCLIDTO {

    public static validate_fields(fields: IFields): [string | undefined, IUser? ]{
        const { email, password } = fields;

        if( !email) return [ "el campo email es requerido" ];

        if( !Validator.email.test( email )) return [ "ingrese un correo valido" ];

        if( !password ) return [ "el campo contraseña es requerida" ]; 

        if( Validator.less_than( password, 8 )) return [ "la contraseña debe contener mas de 8 caracteres" ];

        if( !Validator.password.test( password ) ) return [ "La contraseña debe contener: \n\t 1. una letra en mayuscula \n\t 2. un digito \n\t 3. un caracter especial" ];

        if( Validator.greater_than( password, 12 )) return [ "la contraseña debe contener menos de 12 caracteres" ];

        return [ undefined, { name: "admin", lastname: "admin", phone: "+57", email, password, role: Role.ADMIN_ROLE } as IUser]

    }
}