import { Router } from "express";
import { AuthController } from "./auth.controller";
import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { UserRepositoryImp } from "@/infraestructure/repositories";


/**
 * Clase que define las rutas de autenticación de la aplicación.
 *
 * Se encarga de inicializar las dependencias necesarias (datasource, repositorio y controlador)
 * y exponer un enrutador de Express con los endpoints disponibles para autenticación.
 */
export class AuthRoutes {


    /**
     * Devuelve un enrutador de Express con las rutas relacionadas con autenticación.
     *
     * Rutas disponibles:
     * - `POST /register`: Registro de un nuevo usuario.
     * - `POST /signin`: Inicio de sesión de un usuario existente.
     *
     * @returns {Router} Enrutador con las rutas de autenticación configuradas.
     */
    public static get routes(): Router {

        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp( userDatasource );

        const controller = new AuthController( userRepository );

        const routes = Router();
        routes.post( "/register", controller.singUp );
        routes.post( "/signin", controller.singIn );
        routes.put( "/active-account", controller.accountActive );
        return routes;
    }
}