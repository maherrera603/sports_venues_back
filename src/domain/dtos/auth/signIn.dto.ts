import { Validator } from "@/application/validations";
import { IUser } from "@/data/models";

interface IFields {
    email: string;
    password: string;

}


/**
 * Data Transfer Object (DTO) para la autenticación de usuarios en el proceso de inicio de sesión.
 *
 * Esta clase centraliza la validación de los campos requeridos para el login (`email` y `password`)
 * antes de delegar la lógica al caso de uso correspondiente.
 *
 * ### Validaciones aplicadas:
 * - **Email**
 *   - Es requerido.
 *   - Debe tener un formato válido.
 * - **Password**
 *   - Es requerida.
 *   - Debe tener más de 8 caracteres.
 *   - Debe tener menos de 12 caracteres.
 *   - Debe contener al menos:
 *     1. Una letra mayúscula.
 *     2. Un dígito.
 *     3. Un carácter especial.
 */
export class AuthSingInDTO {

    /**
     * Valida los campos necesarios para el inicio de sesión.
     *
     * @param fields Objeto con las propiedades `email` y `password` a validar.
     * @returns Una tupla:
     * - `[string]` → Mensaje de error en caso de validación fallida.
     * - `[undefined, IUser]` → Objeto `IUser` válido cuando las validaciones pasan.
     */
    public static validate_fields(fields: IFields): [string | undefined, IUser? ]{
        const { email, password } = fields;

        if( !email) return [ "el campo email es requerido" ];

        if( !Validator.email.test( email )) return [ "ingrese un correo valido" ];

        if( !password ) return [ "el campo contraseña es requerida" ]; 

        if( Validator.less_than( password, 8 )) return [ "la contraseña debe contener mas de 8 caracteres" ];

        if( !Validator.password.test( password ) ) return [ "La contraseña debe contener: <br> 1. una letra en mayuscula <br> 2. un digito <br> 3. un caracter especial" ];

        if( Validator.greater_than( password, 12 )) return [ "la contraseña debe contener menos de 12 caracteres" ];

        return [ undefined, { email, password } as IUser]

    }
}