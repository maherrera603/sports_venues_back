/**
 * @enum Role
 * @description
 * Enumeración que define los diferentes roles de usuario dentro del sistema.
 * 
 * Este enum se utiliza para controlar los niveles de acceso y permisos
 * en las operaciones del dominio, diferenciando entre administradores y usuarios regulares.
 */
export enum Role {
    ADMIN_ROLE = "ADMIN_ROLE",
    USER_ROLE = "USER_ROLE"
}