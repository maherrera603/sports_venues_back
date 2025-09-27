import { IUser } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces/response.interface";
import { UserRepository } from "@/domain/repositories";
import { BcryptAdapter } from "@/plugins/bcrypt.adapter";
import { EmailService } from "@/presentation/services";


/**
 * Caso de uso encargado de gestionar el registro de nuevos usuarios.
 *
 * Este caso de uso implementa la lógica de negocio para:
 * - Verificar si el usuario ya existe en el sistema.
 * - Cifrar la contraseña antes de almacenarla.
 * - Registrar al usuario en el repositorio.
 * - Enviar un correo de activación de cuenta.
 */
export class SignUpUseCase {
    private emailService: EmailService;

    /**
     * Inicializa el caso de uso inyectando el repositorio de usuarios.
     *
     * @param userRepository - Repositorio que permite acceder y modificar los datos de usuario.
     */
    constructor( private readonly userRepository: UserRepository ){
        this.emailService = new EmailService();
    }

    /**
     * Ejecuta el flujo de registro de usuario.
     *
     * 1. Verifica si el correo electrónico ya está registrado.
     * 2. Cifra la contraseña utilizando `BcryptAdapter`.
     * 3. Crea un nuevo usuario en el repositorio.
     * 4. Envía un correo electrónico de activación de cuenta.
     * 5. Devuelve una respuesta estandarizada con los datos del nuevo usuario.
     *
     * @param user - Objeto `IUser` con los datos del usuario a registrar.
     * @returns {Promise<IResponse<IUser>>} Respuesta estandarizada con el usuario creado.
     *
     * @throws {CustomError.conflict} Si el correo electrónico ya está registrado.
     * @throws {CustomError.internalServer} Si ocurre un error inesperado en la creación o envío de correo.
     */
    public async execute( user: IUser ): Promise<IResponse<IUser>>{

        const exists = await this.userRepository.findUserByEmail( user.email! );
        if( exists ) throw CustomError.conflict("El usuario ya se encuentra registrado");

        const pwd = BcryptAdapter.hash_pwd( user.password! );
        const data = { ...user, password: pwd } as IUser;

        const newUser = await this.userRepository.createUser( data );

        this.emailService.sendEmailForActiveAccount( newUser ); 
        
        return {
            code: 200,
            status: "OK",
            message: "¡Bienvenido a Sports Venues! Gracias por unirte a nuestra comunidad.",
            data: newUser
        }
    }
}