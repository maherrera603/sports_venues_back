import { IUser } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces/response.interface";
import { UserRepository } from "@/domain/repositories";
import { BcryptAdapter, JWTAdapter } from "@/plugins";


/**
 * Caso de uso para iniciar sesión en el sistema.
 *
 * Se encarga de:
 *  - Validar que el usuario exista por email.
 *  - Verificar la contraseña contra el hash almacenado.
 *  - Confirmar que la cuenta esté activa.
 *  - Generar un token JWT de autenticación.
 *
 * @class SignInUseCase
 */
export class SignInUseCase {

    /**
     * @param userRespository - Repositorio de usuarios que permite consultar
     *                          y validar credenciales en la base de datos.
     */
    constructor( private readonly userRespository: UserRepository){}

    /**
     * Ejecuta el flujo de inicio de sesión para un usuario.
     *
     * @param user - Objeto con las credenciales del usuario (email y password).
     * @returns Una promesa que resuelve en un objeto `IResponse` con:
     *          - Token JWT de autenticación.
     *          - Información del usuario (sin contraseña ni estado de cuenta).
     *
     * @throws {CustomError.notFound} - Si el email o contraseña son inválidos.
     * @throws {CustomError.conflict} - Si la cuenta no está activa o no se pudo generar el token.
     *
     * @example
     * ```ts
     * const useCase = new SingInUseCase(userRepo);
     * const response = await useCase.singIn({ email: "test@test.com", password: "1234" });
     * ```
     */
    public async execute( user: IUser): Promise<IResponse<{token: string, user: IUser}>>{

        const exists = await this.userRespository.findUserByEmailWithPassword( user.email!);
        if( !exists ) throw CustomError.notFound("el email y/o contraseña son invalidos");
        
        const isValidPwd = BcryptAdapter.compare_pwd(user.password!, exists.password!);
        if(!isValidPwd) throw CustomError.notFound("el email y/o contraseña son invalidos");
        
        if( !exists.accountActive ) throw CustomError.conflict("debe activar su cuenta, verifique su correo electronico");

        const token = await JWTAdapter.generateToken({ id: exists.id!, email: exists.email! })
        if( !token ) throw CustomError.conflict("error: no se ha generado el token");

        // TODO: eliminar linea 26 si no es necesaria
        delete exists.accountActive;
        delete exists.password;
        
        return {
            code: 200,
            status: "OK",
            message: "Bienvenido",
            data: {
                token,
                user: exists
            }
        }
    }
}