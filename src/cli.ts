import { UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { UserRepositoryImp } from "@/infraestructure/repositories";
import { SignUpUseCase } from "@/application/useCases/auth";
import { AuthCLIDTO } from "@/domain/dtos/auth";
import { EnvsAdapter, YargAdapter } from "@/plugins";
import { CustomError } from "@/domain/errors";
import { MongoDatabase } from "@/data/databases";


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