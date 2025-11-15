import { ActiveAccount, SignInUseCase, SignUpUseCase } from "@/application/useCases/auth";
import { AuthRegisterDTO, AuthSingInDTO } from "@/domain/dtos/auth";
import { CustomError } from "@/domain/errors";
import { UserRepository } from "@/domain/repositories";
import { NextFunction, Request, Response } from "express";


/**
 * Controlador encargado de gestionar las solicitudes de autenticación.
 *
 * Se encarga de recibir y validar las peticiones HTTP relacionadas con
 * el registro y el inicio de sesión de usuarios, delegando la lógica de negocio
 * a los casos de uso correspondientes.
 */
export class AuthController {
    private signUpUseCase: SignUpUseCase;
    private signInUseCase: SignInUseCase;
    private activeAccount: ActiveAccount;


    /**
     * Inicializa el controlador de autenticación.
     *
     * @param userRepository - Repositorio de usuarios que será inyectado en los casos de uso.
     */
    constructor( private readonly userRepository: UserRepository ){
        this.signUpUseCase = new SignUpUseCase( this.userRepository );
        this.signInUseCase = new SignInUseCase( this.userRepository );
        this.activeAccount = new ActiveAccount( this.userRepository );   
    }

    /**
     * Maneja la petición de registro de un nuevo usuario.
     *
     * 1. Valida los campos de entrada mediante `AuthRegisterDTO`.
     * 2. Ejecuta el caso de uso `SignUpUseCase`.
     * 3. Devuelve una respuesta estandarizada al cliente.
     *
     * @param req - Objeto de solicitud HTTP de Express.
     * @param res - Objeto de respuesta HTTP de Express.
     * @param next - Función para delegar el manejo de errores al middleware de Express.
     */
    public singUp = ( req: Request, res: Response, next: NextFunction) => {
        const [ error, user ] = AuthRegisterDTO.validate_fields(req.body);
        if( error ) throw CustomError.badRequest( error );

        this.signUpUseCase.execute(user!)
            .then( resp => res.status(resp.code).json(resp))
            .catch( error => next( error ));
    }


    /**
     * Maneja la petición de inicio de sesión de un usuario existente.
     *
     * 1. Valida los campos de entrada mediante `AuthSignInDTO`.
     * 2. Ejecuta el caso de uso `SignInUseCase`.
     * 3. Devuelve una respuesta estandarizada al cliente.
     *
     * @param req - Objeto de solicitud HTTP de Express.
     * @param res - Objeto de respuesta HTTP de Express.
     * @param next - Función para delegar el manejo de errores al middleware de Express.
     */
    public singIn = ( req: Request, res: Response, next: NextFunction ) => {
        const [ error, user] = AuthSingInDTO.validate_fields( req.body);
        if( error ) throw CustomError.badRequest( error );

        this.signInUseCase.execute( user! )
            .then( resp => res.status(resp.code).json( resp ))
            .catch( error => next( error));
    }

    /**
     * Controlador para la activación de cuenta de usuario.
     *
     * Este método se encarga de:
     * 1. Extraer y validar el token JWT desde el encabezado `Authorization` en la petición.
     * 2. Verificar que el esquema de autorización sea `Bearer`.
     * 3. Delegar la activación de la cuenta al caso de uso `ActiveAccount`.
     * 4. Responder al cliente con el resultado de la operación.
     *
     * @param req Objeto de la petición de Express. Debe contener el encabezado `Authorization` con el token JWT.
     * @param res Objeto de la respuesta de Express. Se utiliza para enviar el resultado de la activación.
     * @param next Función `NextFunction` de Express para manejar errores en el middleware.
     *
     * @throws {CustomError} Si no se envía el encabezado `Authorization`, 
     *         si el esquema no es `Bearer`, o si ocurre un error durante la activación.
     *
     * @returns {void} Envía una respuesta HTTP con el resultado de la activación:
     *  - Código `200`: Cuenta activada correctamente.
     *  - Errores propagados al middleware de manejo de errores.
     */
    public accountActive = ( req: Request, res: Response, next: NextFunction ) => {
        const [bearer, token] = req.header("Authorization")?.split(" ") || "";
        
        if( !bearer?.includes("Bearer")) throw CustomError.forbidden("no tienes permisos para activar la cuenta");
        this.activeAccount.execute( token as string)
            .then( resp => res.status(resp.code).json( resp ))
            .catch( error => next( error));
        
    }
}