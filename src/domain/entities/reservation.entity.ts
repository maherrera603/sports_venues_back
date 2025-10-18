import { IReservation } from "@/data/models";


/**
 * Método estático que transforma un objeto JSON genérico en una instancia del modelo IReservation.
 * 
 * @param data - Objeto genérico con los datos de la reserva (por ejemplo, recibido desde una API o base de datos).
 * @returns Un objeto que cumple con la interfaz IReservation.
 */
export class ReservationEntity {

    // Se extraen los campos relevantes del objeto data mediante desestructuración.
    public static from_json( data: {[key: string]: any}): IReservation{

        const { id, date_reservation, status, hours, hour_initial, hour_finish, sports_venue, confirm_reservation, to_user, user  } = data;

        return { id, date_reservation, status, hours, hour_initial, hour_finish, sports_venue, confirm_reservation, to_user, user } as IReservation;
    }
}