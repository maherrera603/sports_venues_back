import { model, Schema, Types } from "mongoose";


/**
 * Esquema que representa un escenario deportivo dentro de la aplicación.
 * Incluye información sobre su nombre, ubicación, disponibilidad
 * y la relación con el usuario que lo administra.
 */
const sportVenueSchema = new Schema({
    /**
     * Nombre del escenario deportivo.
     * Ejemplo: "Cancha Sintética A"
     */
    name: {
        type: String,
        required: [ true, "Missing name is required"],
    },
    /**
     * Ubicación o descripción del escenario.
     * Ejemplo: "Coliseo Central - Piso 1"
     */
    venue: {
        type: String,
        required: [ true, "Missing venue is required"],
    },
    /**
     * Indica si el escenario está disponible para reservas.
     * Por defecto es `true`.
     */
    available: {
        type: Boolean,
        default: true,
    },

    /**
     * Relación con el usuario que administra el escenario.
     * Referencia al modelo `Users`.
     */
    userId: {
        type: Types.ObjectId,
        ref: 'Users',
        required: [ true, "Missing userId is required"]
    },
},{
    timestamps: true // añade createdAt y updatedAt
}
);

/**
 * Configuración de serialización a JSON.
 * - Elimina `_id` y lo reemplaza por `id`.
 * - Oculta `__v`.
 */
sportVenueSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {},
});

// Índice compuesto único: name + venue
sportVenueSchema.index({ name: 1, venue: 1}, { unique: true})

/**
 * Modelo de Mongoose para los escenarios deportivos.
 */
export const SportVenueModel = model("SportVenue", sportVenueSchema);