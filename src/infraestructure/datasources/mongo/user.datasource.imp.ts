import { IUser } from "@/data/models";
import { UserModel } from "@/data/schemas";
import { UserDatasource } from "@/domain/datasources";
import { UserEntity } from "@/domain/entities";
import { CustomError } from "@/domain/errors";


/**
 * Implementación de la fuente de datos para el manejo de usuarios.
 * 
 * Esta clase interactúa directamente con la base de datos (MongoDB mediante Mongoose),
 * encapsulando las operaciones CRUD y de consulta relacionadas con usuarios.
 * 
 * Implementa la interfaz `UserDatasource`, asegurando el cumplimiento de las
 * reglas de negocio del dominio.
 */
export class UserDatasourceImp implements UserDatasource{

    /**
     * Busca un usuario por su correo electrónico.
     * 
     * @param email - Correo electrónico del usuario.
     * @returns El usuario encontrado sin el campo de contraseña o `null` si no existe.
     * @throws CustomError.notFound Si ocurre un error en la búsqueda.
     */
    async findUserByEmail(email: string): Promise<IUser|null> {
        try {
            const user = await UserModel.findOne({ email });
            return user ? UserEntity.from_json( user ): null;
        } catch (error) {
            console.log( error )
            throw CustomError.notFound("datos del usuario no encontrados")
        }
    }

    /**
     * Busca un usuario por su correo electrónico, incluyendo la contraseña.
     * 
     * @param email - Correo electrónico del usuario.
     * @returns El usuario encontrado con contraseña o `null` si no existe.
     * @throws CustomError.notFound Si ocurre un error en la búsqueda.
     */
    async findUserByEmailWithPassword(email: string): Promise<IUser | null> {
        try {
            const user = await UserModel.findOne({ email });
            return user ? UserEntity.from_json_with_password( user ): null;
        } catch (error) {
            throw CustomError.notFound("datos del usuario no encontrados")
        }
    }
    
    /**
     * Busca un usuario por su ID.
     * 
     * @param id - Identificador único del usuario.
     * @returns El usuario encontrado o `null` si no existe.
     * @throws CustomError.notFound Si ocurre un error en la búsqueda.
     */
    async findUserById(id: string): Promise<IUser|null> {
        try {
            const user = await UserModel.findOne({ _id: id });
            return user ? UserEntity.from_json( user ) : null;
        } catch (error) {
            throw CustomError.notFound("datos del usuario no encontrados")
        }
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param user - Objeto de tipo `IUser` con los datos del usuario a registrar.
     * @returns El usuario creado.
     * @throws CustomError.internalServer Si no se puede guardar el usuario.
     */
    async createUser(user: IUser): Promise<IUser> {
        try {
            const newUser = await UserModel.create({ ...user });
            return UserEntity.from_json( newUser );
        } catch (error) {
            throw CustomError.internalServer("error: no se ha logrado guardar los datos ");
        }
    }

    /**
     * Actualiza los datos de un usuario.
     * 
     * @param user - Objeto de tipo `IUser` con los nuevos datos.
     * @returns El usuario actualizado.
     * @throws CustomError.internalServer Si no se puede actualizar el usuario.
     */
    async updateUser(user: IUser): Promise<IUser> {
        try {
            const updateUser = await UserModel.findByIdAndUpdate({_id: user.id}, { ...user}, { new : true});
            return UserEntity.from_json( updateUser! );
        } catch (error) {
            throw CustomError.internalServer("error: no se ha logrado actualizar los datos")
        }
    }

    /**
     * Activa la cuenta de un usuario.
     * 
     * @param user - Objeto de tipo `IUser` que contiene el `id` del usuario a activar.
     * @returns El usuario con la cuenta activada.
     * @throws CustomError.internalServer Si no se puede activar la cuenta.
     */
    async activeAccout(user: IUser): Promise<IUser> {
        try {
            const update = await UserModel.findByIdAndUpdate({ _id: user.id}, { accountActive: true}, { new: true});
            return UserEntity.from_json( update! );
        } catch (error) {
            throw CustomError.internalServer("error: no se ha logrado activar la cuenta");
        }
    }
    
}