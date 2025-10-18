import { IUser } from "@/data/models";

/**
 * Define el contrato para el acceso a los datos relacionados con usuarios.
 *
 * Esta interfaz pertenece a la capa de **datasource/repository** y abstrae la fuente de datos
 * (ej. base de datos SQL, NoSQL, API externa, memoria, etc.), de forma que la lógica de negocio
 * no dependa de implementaciones concretas.
 *
 * @interface UserRepository
 */
export interface UserRepository {
    /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email - Dirección de correo electrónico del usuario.
     * @returns Una promesa que resuelve en la entidad `IUser` encontrada o nulo.
     */
    findUserByEmail ( email: string ): Promise<IUser|null>; 

    
    /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email - Dirección de correo electrónico del usuario.
     * @returns Una promesa que resuelve en la entidad `IUser` encontrada.
     */
    findUserByEmailWithPassword (email: string): Promise<IUser|null>;

    /**
     * Busca un usuario por su identificador único.
     *
     * @param id - Identificador único del usuario.
     * @returns Una promesa que resuelve en la entidad `IUser` encontrada o nulo.
     */
    findUserById( id: string ):Promise<IUser|null>;

    findByRole( role: string): Promise<IUser|null>;

    /**
     * Crea un nuevo usuario en la fuente de datos.
     *
     * @param user - Objeto `IUser` que contiene la información del nuevo usuario.
     * @returns Una promesa que resuelve en la entidad `IUser` creada.
     */
    createUser( user: IUser): Promise<IUser>;

    /**
     * Actualiza la información de un usuario existente en la fuente de datos.
     *
     * @param user - Objeto `IUser` con los datos actualizados.
     * @returns Una promesa que resuelve en la entidad `IUser` actualizada.
     */
    updateUser( user: IUser): Promise<IUser>;

    /**
     * Elimina un usuario existente en el sistema a partir de su identificador único.
     *
     * @param id Identificador único del usuario (string o number) que se desea eliminar.
     * @returns Una promesa que resuelve a `true` si la eliminación fue exitosa, 
     *          o `false` si el usuario no fue encontrado.
     */
    deleteUser( id: string | number): Promise<boolean>;

    /**
     * Activa la cuenta de un usuario existente en la fuente de datos
     * @returns una promesa que resuelve en la entidad 'IUser' actualizada
     */
    activeAccout( user: IUser): Promise<IUser>;
}