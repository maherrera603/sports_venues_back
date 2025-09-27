
/**
 * Clase que representa Validaciones personalizadas mediante expresiones regulares
 */
export class Validator {
    
    /**
     * Expresion regular para validar texto que contiene solo letras
     * incluye acentos y espacions
     * @returns { RegExp } Expresion regular ara validar texto alfabetico con espacions 
     */
    public static get text(): RegExp {
        return /^[A-Za-zÀ-ÿ\s]+$/;
    }

    /**
     * Expresion regular para validar que contenga solo numeros
     * @returns { RegExp } Expresion regular para validar numeros y no tenga letras
     */
    public static get number(): RegExp {
        return /^\d+$/;
    }

    /**
   * Valida que el texto tenga formato válido de email.
   * Esta expresión permite:
   * - Letras, números, puntos, guiones y guion bajo en la parte local.
   * - Un solo símbolo @.
   * - Dominio con letras, números, guiones y puntos.
   * - Extensión de dominio de al menos 2 caracteres.
   * 
   * No valida todos los casos posibles (p.ej. emails con comillas), pero cubre la mayoría comunes.
   * 
   * @returns Expresion regular para validar el formato del email
   */
    public static get email() : RegExp {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    }

    /**
     * Valida que la contraseña contenga al menos:
     * - Una letra mayúscula
     * - Un número
     * - Un carácter especial
     *
     * @returns Expresion regulara para validar formato de contraseñas
     */
    public static get password(): RegExp {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
    }

    /**
     * verifica si la longitud del texto en el campo es mayor que un valor dado.
     * @param { string } field - el texto o cadena a evaluar
     * @param { number } length  - el valor de la longitud con el cual comparar
     * @returns retorna 'true' si la longitud del texto (sin espacios al inicio y final ) es mayor
     * que 'length', de lo contrario false
     */
    public static greater_than( field: string, length: number): boolean {
        return field.trim().length > length;
    }

    /**
     * verifica si la longitud del texto en el campo es menor que un valor dado.
     * @param { string } field - el texto o cadena a evaluar
     * @param { number } length  - el valor de la longitud con el cual comparar
     * @returns retorna 'true' si la longitud del texto (sin espacios al inicio y final ) es menor
     * que 'length', de lo contrario false
     */
    public static less_than( field: string, length: number): boolean{
        return field.trim().length < length;
    }
}