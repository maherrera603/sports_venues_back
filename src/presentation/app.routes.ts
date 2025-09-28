import { Router } from "express";
import { AuthRoutes } from "@/presentation/auth";
import { UserRoutes } from "@/presentation/user";
import { SportVenueRoutes } from "@/presentation/sport-venue";


/**
 * Clase que encapsula la definicion de las rutas de la aplicacion
 */
export class AppRoutes{

    /**
     * Obtiene el enrutador principal con todas las rutas configuradas.
     * @returns { Router } Instancia de Router de express con las rutas definidas
     */
    public static get routes(): Router{
        const endpoint = "/api/v1"

        // Todo: implementar rutas de los modulos
        const routes = Router();
        routes.use( `${endpoint}/auth`, AuthRoutes.routes );
        routes.use( `${endpoint}/user`, UserRoutes.routes );
        routes.use( `${endpoint}/sport-venue`, SportVenueRoutes.routes );
        return routes;
    }

}