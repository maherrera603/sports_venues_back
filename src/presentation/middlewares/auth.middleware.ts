import { NextFunction, Request, Response } from "express";
import { Role } from "@/domain/enum";
import { CustomError } from "@/domain/errors";
import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { JWTAdapter } from "@/plugins";

/**
 * @class AuthMiddleware
 * @description
 * Middleware de autenticación y autorización basado en JWT.
 * 
 * Este middleware valida el token JWT incluido en el encabezado `Authorization`
 * y verifica que el usuario autenticado tenga los permisos requeridos
 * según su **rol** dentro del sistema.
 * 
 * Se utiliza en rutas que requieren autenticación o restricción por roles.
 */
export class AuthMiddleware {

    /**
     * Genera un middleware de validación de token JWT y control de acceso por roles.
     * 
     * @param {Role[]} roles - Lista de roles permitidos para acceder al recurso (por ejemplo: `[Role.ADMIN_ROLE]`).
     * @returns {Function} Middleware de Express que valida autenticación y permisos del usuario.
     * 
     * @throws {CustomError} Si:
     * - No se envía el header `Authorization`.
     * - El formato del token es inválido.
     * - El token no es válido o ha expirado.
     * - El usuario no existe.
     * - El usuario no posee los roles necesarios.
     */
    public static validation( roles: Role[]){
        return async ( req: Request, res: Response, next: NextFunction) => {
            const authorization = req.header("Authorization");
            if(!authorization) throw CustomError.unauthorized("El token se ha proveido");

            if( !authorization.startsWith("Bearer ")) throw CustomError.internalServer("El token es invalido");

            const [, token] = authorization.split(" ");
            const data = await JWTAdapter.validatedToken<{ id: string|number, email: string}>( token! );
            if(!data) throw CustomError.unauthorized("el token es invalido");

            const datasource = new UserDatasourceImp();
            const user = await datasource.findUserById( String(data.id) );
            if( !user) throw CustomError.unauthorized("el token es invalido");
            
            if( !roles.includes( user.role!) ) throw CustomError.forbidden("No tiene permisos necesarios");

            req.user = user;

            next();
        }
    }
}