import { Router } from "express";

/**
 * Clase que encapsula la definicion de las rutas de la aplicacion
 */
export class AppRoutes{

    /**
     * Obtiene el enrutador principal con todas las rutas configuradas.
     * @returns { Router } Instancia de Router de express con las rutas definidas
     */
    public static get routes(): Router{
        const routes = Router();

        // Todo: implementar rutas de los modulos

        return routes;
    }

}