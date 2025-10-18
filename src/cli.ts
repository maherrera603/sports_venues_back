import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { UserRepositoryImp } from "@/infraestructure/repositories";
import { SignUpUseCase } from "@/application/useCases/auth";
import { AuthCLIDTO } from "@/domain/dtos/auth";
import { EnvsAdapter, YargAdapter } from "@/plugins";
import { CustomError } from "@/domain/errors";
import { MongoDatabase } from "@/data/databases";


/**
 * @file create-admin.ts
 * @description
 * Script CLI para registrar un usuario administrador en la base de datos MongoDB.
 * 
 * Este archivo se ejecuta desde la terminal y permite crear el usuario `ADMIN_ROLE`
 * utilizando parámetros pasados como argumentos de línea de comandos.
 * 
 * Ejemplo de ejecución:
 * ```bash
 * npx ts-node src/scripts/create-admin.ts --name="Miguel" --lastname="Herrera" --email="admin@mail.com" --password="Admin123!" --phone="3001234567"
 * ```
 * 
 * Flujo general:
 * 1. Conecta a la base de datos MongoDB.
 * 2. Inicializa los `datasources` y `repositories`.
 * 3. Ejecuta el caso de uso `SignUpUseCase` para registrar al usuario.
 * 4. Maneja errores de validación o de conexión.
 */
async function main(){
    try {
        // conexion a la base de datos
        const options = { 
            mongoUrl: EnvsAdapter.DATABASE_MONGODB_URL, 
            dbName: EnvsAdapter.DATABASE_NAME 
        };
        await MongoDatabase.connect( options );

        // datasources y repositories
        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp( userDatasource );

        // useCase
        const signUpUseCase = new SignUpUseCase( userRepository );
    
        const [ error, admin ] = AuthCLIDTO.validate_fields( YargAdapter.arguments);
        if( error )return console.log( error );
    
        const resp = await signUpUseCase.execute( admin! );
        console.log( resp.message);

        process.exit(2);
        
        
    } catch (error) {
        if( error instanceof CustomError ) console.log( error.message );
    }
}

( async () => await main() )();