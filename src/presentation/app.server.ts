import express, { Router }  from "express";
import { ErrorMiddleware } from "@/presentation/middlewares";

/**
 * Opciones para configurar el servidor de la aplicacion
 */
interface IOptions {
    port: number; // puerto en el que el servidor escuchara las peticiones
    routes: Router; // Rutas definidas para la aplicacion Express
}

/**
 * Clase que representa la configuracion y gestion del servidor Express de la aplicacion
 */
export class AppServer {
    public readonly app = express(); // instancia principal de Express
    private serverListener?: any; // Referencia al Servidor HTTP creado por express
    private readonly port: number; // Puerto en el que el servidor escuchara
    private routes: Router; // Rutas Configuradas para la aplicacion

    /**
     * Crea una nueva instancia de AppServer con las opciones dadas
     * @param { IOptions } param0 - Objecto con las opciones de configuracion
     * @param { number } param0.port - Puerton donde correra el servidor
     * @param { Router} param0.routes - Rutas de la aplicacion
     */
    constructor( { port, routes }: IOptions ){
        this.port = port;
        this.routes = routes;
    }

    /**
     * Configuracion los middlewares necesario para la aplicacion
     * incluyendo parseo JSON, parseo URL-encoded, rutas y manejo de errores.
     */
    private loadMiddlewares(){
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }));
        this.app.use( this.routes );
        this.app.use( ErrorMiddleware.handle  );
    }

    /**
     * Inicia el servidor y comienza a escuchar en el puerto configurado
     * Carga los Middlewares antes de iniciar
     */
    public start(){
        this.loadMiddlewares();

        this.serverListener = this.app.listen( this.port, () => console.log(`Server running on port ${this.port}`));
    }
}