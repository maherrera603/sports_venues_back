import { CustomError } from "@/domain/errors";
import { connect } from "mongoose";

interface IOptions {
    /** URL de conexión al servidor de MongoDB */
    mongoUrl: string;
    /** Nombre de la base de datos a la que se desea conectar */
    dbName: string;
}

/**
 * Clase encargada de gestionar la conexión a la base de datos MongoDB.
 *
 * Utiliza el cliente oficial de `mongoose` para establecer la conexión.
 *
 * @class MongoDatabase
 */
export class MongoDatabase {

     /**
     * Establece la conexión con una base de datos MongoDB.
     *
     * @param options - Objeto de configuración con la URL y el nombre de la base de datos.
     * @param options.mongoUrl - Cadena de conexión a MongoDB (ej. `"mongodb://localhost:27017"`).
     * @param options.dbName - Nombre de la base de datos a utilizar.
     * @returns Una promesa que se resuelve en `true` si la conexión fue exitosa.
     * @throws {CustomError} Lanza un error interno si la conexión falla.
     */
    static async connect( { mongoUrl, dbName }: IOptions ){
        try {
            await connect( mongoUrl, { dbName });
            return true;
        } catch (error) {
            throw CustomError.internalServer(`Error al realizar la conexion a mongo`);
        }
    }
}