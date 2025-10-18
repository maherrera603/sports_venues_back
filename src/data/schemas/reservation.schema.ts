import { CustomError } from "@/domain/errors";
import { model, Schema, Types } from "mongoose";

/**
 * @file ReservationModel.ts
 * @description
 * Define el esquema Mongoose para las reservas de espacios deportivos.
 * 
 * Cada reserva está asociada a un usuario que la crea, un usuario destinatario (si aplica)
 * y un escenario deportivo. Incluye información temporal, estado y confirmación.
 */
const reservationSchema = new Schema({
    /**
     * Fecha de la reserva (día específico del evento).
     */
    date_reservation: {
        type: Date,
        required: [ true, "missing date_reservation is required"]
    },
    /**
     * Estado actual de la reserva.
     * Valores posibles:
     * - "pending" → Creada pero no confirmada.
     * - "confirmed" → Aprobada o aceptada.
     * - "cancelled" → Anulada.
     * - "completed" → Finalizada correctamente.
     */
    status: {
        type: String,
        required: [ true, "missing status is required"],
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
    /**
     * Cantidad total de horas reservadas.
     */
    hours: {
        type: Number,
        required: [ true, "Missing hours is required"],
        default: 1
    },
    /**
     * Hora de inicio de la reserva (formato 24h, ejemplo: "08:00").
     */
    hour_initial: {
        type: String,
        required: [ true, "missing hour initial is required"],
        unique: true,
    },
    /**
     * Hora de finalización de la reserva (formato 24h, ejemplo: "10:00").
     */
    hour_finish: {
        type: String,
        required: [ true, "missing hour finish is required"],
        unique: true
    },
    /**
     * Referencia al escenario o cancha deportiva reservada.
     */
    sports_venue: {
        type: Types.ObjectId,
        ref: "SportVenue",
        required: [ true, "missing sports menue id is required"]
    },
    /**
     * Indica si la reserva ha sido confirmada.
     */
    confirm_reservation:{
        type: Boolean,
        default: false,
    },
    /**
     * Referencia al usuario destinatario (si aplica).
     * Puede representar al usuario con quien se realiza la reserva.
     */
    to_user: {
        type: Types.ObjectId,
        required: [ true, "missing to_user is required"],
        ref: "Users"
    },
    /**
     * Administrador que gestiona la reserva.
     */
    user: {
        type: Types.ObjectId,
        required: [ true, "missing user is required"]
    }
},{
    timestamps: true
}); 


/**
 * 🔍 Validación de solapamiento de horarios
 * 
 * Antes de guardar una reserva, verifica que no exista otra reserva
 * en el mismo `sports_venue` y `date_reservation` cuyo rango horario
 * se cruce con el actual.
 */
reservationSchema.pre("save", async function (next) {
    const Reservation = model("Reservation");

    const sameDayReservations = await Reservation.find({
        sports_venue: this.sports_venue,
        date_reservation: this.date_reservation,
        _id: { $ne: this._id } // Ignorar la misma reserva en actualizaciones
    });

    const overlap = sameDayReservations.some((res) => {
        // Convertir horas a minutos para comparar más fácilmente
        const [startA, endA] = [res.hour_initial, res.hour_finish].map(parseToMinutes);
        const [startB, endB] = [this.hour_initial, this.hour_finish].map(parseToMinutes);

        // Hay solapamiento si los intervalos se cruzan
        return startA! < endB! && startB! < endA!;
    });

    if (overlap) throw CustomError.internalServer("El espacio deportivo ya tiene una reserva en este horario.");
    

    next();
});

/**
 * Convierte una hora en formato 'hh:mm AM/PM' a minutos desde medianoche.
 */
function parseToMinutes(hourString: string): number {
    const [time, meridian] = hourString.split(" ");
    let [hours, minutes] = time!.split(":").map(Number);

    if (meridian!.toLowerCase() === "pm" && hours !== 12) hours! += 12;
    if (meridian!.toLowerCase() === "am" && hours === 12) hours = 0;

    return hours! * 60 + minutes!;
}



/**
 * Configuración de serialización del esquema.
 * Elimina metadatos innecesarios y transforma los documentos
 * al formato JSON que será expuesto en la API.
 */
reservationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret, options) => {}
});


/**
 * Modelo Mongoose para la colección de reservas.
 */
export const ReservationModel = model('Reservation', reservationSchema);