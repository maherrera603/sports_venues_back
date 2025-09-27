/**
 * Interfaz que representa la entidad de un Usuario en el sistema.
 *
 * Este modelo define las propiedades que describen a un usuario y
 * se utiliza como contrato de datos en las diferentes capas de la aplicación.
 *
 * ⚠️ Nota: Muchas de las propiedades son opcionales (`?`) ya que pueden no estar
 * presentes en todos los contextos (ej. al registrar un usuario, al mostrar su perfil, etc.).
 */
export interface IUser {
    
    /**
     * Identificador único del usuario.
     * Usualmente generado automáticamente por la base de datos.
     */
    id?: string;

    /**
     * Nombre del usuario.
     */
    name?: string;

    /**
     * Apellido o apellidos del usuario.
     */
    lastname?: string;

    /**
     * Número de teléfono de contacto del usuario.
     */
    phone?: string;

    /**
     * Dirección de correo electrónico del usuario.
     * Debe ser único en el sistema.
     */
    email?: string;

    /**
     * Contraseña del usuario en formato cifrado/hash.
     * ⚠️ Nunca debe exponerse en la capa de presentación ni en respuestas públicas.
     */
    password?: string;

    /**
     * Estado de la cuenta del usuario (ej. activa o inactiva).
     * Puede representarse como string (ej. "true"/"false") o enumeración según implementación.
     */
    accountActive?: boolean;
}