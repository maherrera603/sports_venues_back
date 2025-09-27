import { NextFunction, Request, Response } from "express";
import { Role } from "@/domain/enum";
import { CustomError } from "@/domain/errors";
import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { JWTAdapter } from "@/plugins";

export class AuthMiddleware {

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