
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

    /**
     * Expresión regular para validar direcciones urbanas.
     *
     * Soporta formatos comunes en Colombia como:
     * - "calle 5 # 12 - 23"
     * - "cra 10 No. 45 - 60"
     * - "avenida 30 # 20 - 15 torre B"
     * - "transversal 8 # 15 - 45 apto 302"
     *
     * La expresión valida:
     * - Tipos de vía: calle, carrera, cra, avenida, av, transversal, diagonal, diag.
     * - Número principal con posible letra (ej: "10A").
     * - Separador `#` o `No.`.
     * - Número secundario seguido de un guion y otro número.
     * - Información opcional adicional (ej: apartamento, torre, piso).
     *
     * Es insensible a mayúsculas/minúsculas (`i`).
     */
    public static get address(): RegExp{
        return /^(calle|cra|carrera|av|avenida|transversal|diag|diagonal)\s?\d+([a-zA-Z]?)\s?(#|No\.?)\s?\d+\s?-\s?\d+(\s?[a-zA-Z0-9\s]*)?$/i
    }


    /**
     * Expresión regular para validar fechas en formato `YYYY-MM-DD`.
     * 
     * - Acepta años entre 1900 y 2099.
     * - Valida meses del `01` al `12`.
     * - Valida días del `01` al `31`.
     * - No valida la lógica de días por mes ni años bisiestos (para validación básica).
     */
    public static get date(): RegExp {
        return /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    }

    /**
     * Expresión regular para validar horas en formato de 12 horas `hh:mm AM/PM`.
     * 
     * - Acepta horas entre `01:00 AM` y `12:59 PM`.
     * - Permite minúsculas o mayúsculas en AM/PM.
     * - Permite un cero opcional al inicio de la hora (`9:30 AM` o `09:30 AM`).
     */
    public static get hour(): RegExp {
        return /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM|am|pm)$/

    }
}