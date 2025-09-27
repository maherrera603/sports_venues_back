import { Schema, model } from "mongoose";

/**
 * Esquema de usuario en la base de datos.
 * Define los datos personales, credenciales y rol del usuario dentro del sistema.
 */
const userSchema = new Schema({
    /** Nombre del usuario */
    name: {
        type: String,
        required: [ true, "Missing field name"],
    },
    /** Apellido del usuario */
    lastname: {
        type : String,
        required: [ true, "Missing field lastname"],
    },
    /** Número telefónico del usuario (debe ser único) */
    phone: {
        type: String,
        required: [ true, "Missing field phone"],
        unique: true,
    },
    /** Correo electrónico del usuario (debe ser único) */
    email: {
        type: String,
        required: [ true, "Missing field email"],
        unique: true,
    },
    /** Contraseña encriptada del usuario */
    password: {
        type: String,
        required: [ true, "Missing field password"],
    },
    /**
     * Indica si la cuenta está activa.
     * Por defecto `false` hasta que se confirme activación.
     */
    accountActive: {
        type: Boolean,
        require: [ true, "Missing field accountActive"],
        default: false,
    },
    /**
     * Rol asignado al usuario dentro del sistema.
     * Controla permisos y nivel de acceso.
     * Ejemplo: "admin", "user".
     */
    role: {
        type: String,
        required: [ true, "Missing field role"],
    }
});
// Configuración para transformar el documento a JSON
userSchema.set("toJSON",{
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, option) => {}
});

export const UserModel = model('Users', userSchema);
