import { AppServer, AppRoutes } from "@/presentation";
import { EnvsAdapter } from "@/plugins";
import { MongoDatabase } from "@/data/databases";


/**
 * Funcion principal que inicializa y arranca el servidor de la aplicacion
 */
async function main() {
    // conexion a la base de datos
    const options = { 
        mongoUrl: EnvsAdapter.DATABASE_MONGODB_URL, 
        dbName: EnvsAdapter.DATABASE_NAME 
    };
    await MongoDatabase.connect( options );

    // inicializacion del servidor
    const server = new AppServer({ port: EnvsAdapter.PORT, routes: AppRoutes.routes });
    server.start();
}

/**
 * Invocacion inmediata de la funcion principal para arrancar la aplicacion
 */
( async () =>  await main() )()