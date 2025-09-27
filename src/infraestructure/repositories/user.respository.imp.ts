import { IUser } from "@/data/models";
import { UserDatasource } from "@/domain/datasources";
import { UserRepository } from "@/domain/repositories";


/**
 * Implementación concreta de {@link UserRepository} que actúa como un adaptador
 * entre la capa de dominio y la fuente de datos definida en {@link UserDatasource}.
 *
 * Esta clase sigue el patrón **Repository**, delegando las operaciones de acceso a datos
 * al datasource inyectado. De esta manera, se desacopla la lógica de negocio
 * de la infraestructura (ej. MongoDB, MySQL, API externa).
 *
 * @class UserRepositoryImp
 * @implements UserRepository
 */
export class UserRepositoryImp implements UserRepository{

    /**
     * Crea una nueva instancia del repositorio de usuarios.
     *
     * @param userDatasource - Implementación de {@link UserDatasource} que define
     *                         cómo se accede realmente a los datos (ej. Mongo, SQL, memoria).
     */
    constructor( private readonly userDatasource: UserDatasource){}

    /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email - Dirección de correo electrónico del usuario.
     * @returns Una promesa que resuelve en la entidad {@link IUser} encontrada o nulo.
     */
    findUserByEmail(email: string): Promise<IUser|null> {
        return this.userDatasource.findUserByEmail( email );
    }

        /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email - Dirección de correo electrónico del usuario.
     * @returns Una promesa que resuelve en la entidad {@link IUser} encontrada o nulo.
     */
    findUserByEmailWithPassword(email: string): Promise<IUser | null> {
        return this.userDatasource.findUserByEmailWithPassword(email);
    }

    /**
     * Busca un usuario por su identificador único.
     *
     * @param id - Identificador único del usuario.
     * @returns Una promesa que resuelve en la entidad {@link IUser} encontrada o nulo.
     */
    findUserById(id: string): Promise<IUser|null> {
        return this.userDatasource.findUserById( id );
    }

    /**
     * Crea un nuevo usuario en la fuente de datos.
     *
     * @param user - Objeto {@link IUser} que contiene la información del nuevo usuario.
     * @returns Una promesa que resuelve en la entidad {@link IUser} creada.
     */
    createUser(user: IUser): Promise<IUser> {
        return this.userDatasource.createUser( user );
    }

    /**
     * Actualiza un usuario existente en la fuente de datos.
     *
     * @param user - Objeto {@link IUser} con la información actualizada.
     * @returns Una promesa que resuelve en la entidad {@link IUser} actualizada.
     */
    updateUser(user: IUser): Promise<IUser> {
        return this.userDatasource.updateUser( user );
    }

    /**
     * Activa la cuenta de un usuario existente en la fuente de datos
     * @returns una promesa que resuelve en la entidad 'IUser' actualizada
     */
    activeAccout( user: IUser): Promise<IUser> {
        return this.userDatasource.activeAccout(user);
    }
    
}