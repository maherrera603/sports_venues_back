/**
 * Clase que representa un error personalizado con codigo HTTP y estado.
 * Extiende la clase nativa Error para incluir codigo numerico y estado descriptico
 */
export class CustomError extends Error{

    /**
     * constructor privado para crear una instancia de CustomError
     * @param code - Codigo numerico del error HTTP (ej. 404).
     * @param status - Estado textual del error (ej. 'Not-Found').
     * @param message - Mensaje descriptivo del error.
     */
    private constructor( 
        public readonly code: number, 
        public readonly status: string, 
        public readonly message: string
    ){
        super( message );
    }

    /**
     * Crea un error tipo Bad Request (400)
     * @param { string} message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 400 y estado "Bad-Request"
     */
    public static badRequest = ( message: string) => 
        new CustomError(401, "Bad-Request", message);
    

    /**
     * Crea un error tipo Unauthorized (401)
     * @param {string} message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 401 y estado "Unauthorized"
     */
    public static unauthorized = ( message : string ) =>
        new CustomError( 401, "Unauthorized", message );

    /**
     * Crea un error tipo Forbidden (403)
     * @param { string } message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 403 y estado "Forbidden"
     */
    public static forbidden = ( message : string ) =>
        new CustomError( 403, "Forbidden", message );

    /**
     * Crea un error tipo Not Found (404)
     * @param { string } message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 404 y estado "Not-Found"
     */
    public static notFound = ( message: string ) => 
        new CustomError( 404, "Not-Found", message );

    /**
     * Crea un error tipo Conflict (409)
     * @param { string } message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 409 y estado "Conflict"
     */
    public static conflict = ( message: string ) => 
        new CustomError( 409, "Conflict", message);

    /**
     * Crea un error tipo Internal Server (500)
     * @param { string } message - Mensaje descriptico del error
     * @returns Una instancia de CustomError con codigo 500 y estado "Internal-Server"
     */
    public static internalServer = ( message: string ) =>
        new CustomError( 500, "Internal-Server", message);
}