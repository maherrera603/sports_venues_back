import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../middlewares";
import { Role } from "@/domain/enum";
import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { UserRepositoryImp } from "@/infraestructure/repositories";


/**
 * Clase que define las rutas relacionadas con la gestión de usuarios.
 * 
 * Estas rutas requieren autenticación mediante `AuthMiddleware` y
 * restringen el acceso a roles específicos (ADMIN_ROLE y USER_ROLE).
 */
export class UserRoutes {

    
    /**
     * Retorna el enrutador con todas las rutas de usuario configuradas.
     * 
     * Endpoints disponibles:
     * 
     * - `GET /profile` → Obtiene la información del usuario autenticado.
     * - `PUT /profile` → Actualiza la información del usuario autenticado.
     * - `DELETE /profile` → Elimina la cuenta del usuario autenticado.
     * 
     * Todos los endpoints requieren un token válido y pertenecer a los roles
     * `ADMIN_ROLE` o `USER_ROLE`.
     * 
     * @returns {Router} Instancia de Express Router con las rutas configuradas.
     */
    public static get routes(): Router {

        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp( userDatasource );
        const controller = new UserController( userRepository );

        const routes = Router();
        routes.get( "/profile", AuthMiddleware.validation([ Role.ADMIN_ROLE, Role.USER_ROLE]), controller.findUserById );
        routes.put( "/profile", AuthMiddleware.validation([ Role.ADMIN_ROLE, Role.USER_ROLE]), controller.updateUser );
        routes.delete( "/profile", AuthMiddleware.validation([ Role.ADMIN_ROLE, Role.USER_ROLE]), controller.deleteUser );
        return routes;
    }
}