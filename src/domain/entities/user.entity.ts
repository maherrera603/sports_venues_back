import { IUser } from "@/data/models";

/**
 * Entidad de dominio que representa un Usuario.
 *
 * La clase incluye métodos estáticos para mapear datos genéricos
 * (objetos JSON sin tipar) hacia la interfaz `IUser`.
 *
 * @class UserEntity
 */
export class UserEntity {

    /**
     * Construye un objeto `IUser` a partir de un JSON genérico,
     * excluyendo propiedades sensibles como la contraseña.
     *
     * @param data - Objeto con propiedades dinámicas que pueden provenir de
     *               una petición HTTP, una base de datos u otra fuente externa.
     * @returns Una instancia tipada de `IUser` con las propiedades básicas
     *          (`id`, `name`, `lastname`, `phone`, `email`).
     */
    public static from_json( data: {[key: string]: any }): IUser{
        const { id, name, lastname, phone, email, role } = data;
        return { id, name, lastname, phone, email, role } as IUser;
    }

    /**
     * Construye un objeto `IUser` a partir de un JSON genérico,
     * incluyendo propiedades sensibles como `password` y `accountActive`.
     *
     * Este método suele usarse cuando se requiere la información completa
     * del usuario para validaciones internas (ej. autenticación).
     *
     * ⚠️ **Precaución**: No debe usarse este objeto completo en la capa de
     * presentación, ya que expone datos sensibles.
     *
     * @param data - Objeto con propiedades dinámicas que pueden provenir de
     *               una petición HTTP, una base de datos u otra fuente externa.
     * @returns Una instancia tipada de `IUser` con todas las propiedades
     *          (`id`, `name`, `lastname`, `phone`, `email`, `password`, `accountActive`).
     */
    public static from_json_with_password( data: {[key: string]: any }): IUser{
        const { id, name, lastname, phone, email, password, accountActive } = data;
        return { id, name, lastname, phone, email, password, accountActive } as IUser;
    }
}