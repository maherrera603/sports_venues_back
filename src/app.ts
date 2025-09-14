import { AppServer, AppRoutes } from "@/presentation";
import { EnvsAdapter } from "@/plugins";



/**
 * Funcion principal que inicializa y arranca el servidor de la aplicacion
 */
function main() {
    
    const server = new AppServer({ port: EnvsAdapter.PORT, routes: AppRoutes.routes });
    server.start();
}

/**
 * Invocacion inmediata de la funcion principal para arrancar la aplicacion
 */
( () => {
    main();
})()