import { IReservation } from "@/data/models";
import { ReservationModel } from "@/data/schemas";
import { IReservationDatasource } from "@/domain/datasources";
import { ReservationEntity } from "@/domain/entities";

import { CustomError } from "@/domain/errors";
import { Types } from "mongoose";

/**
 * @class ReservationDatasourceImp
 * @implements {IReservationDatasource}
 * @description
 * Implementación concreta de la fuente de datos (`Datasource`) para la entidad de Reservas.
 * 
 * Esta clase actúa como un adaptador de la capa de infraestructura, 
 * conectando la aplicación con la base de datos MongoDB mediante Mongoose.
 * 
 * Todas las operaciones CRUD están encapsuladas y devuelven datos 
 * en el formato definido por la entidad del dominio (`ReservationEntity`).
 */
export class ReservationDatasourceImp implements IReservationDatasource {

    /**
     * Obtiene todas las reservas almacenadas en la base de datos.
     * 
     * @async
     * @returns {Promise<IReservation[]>} Lista de todas las reservas existentes.
     * @throws {CustomError.internalServer} Si ocurre un error al consultar la base de datos.
     */
    async find(): Promise<IReservation[]> {
        try {
            const reservations = await ReservationModel.find().populate("to_user sports_venue");
            return reservations.map( ReservationEntity.from_json );
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    /**
     * Obtiene todas las reservas asociadas a un usuario específico.
     * 
     * @async
     * @param {string | number} user - ID del usuario propietario de las reservas.
     * @returns {Promise<IReservation[]>} Lista de reservas del usuario.
     * @throws {CustomError.internalServer} Si ocurre un error durante la consulta.
     */
    async findByUser(user: string | number): Promise<IReservation[]> {
        try {
            const reservations = await ReservationModel.find({ to_user: user }).populate("to_user sports_venue");
            return reservations.map( ReservationEntity.from_json );
        } catch (error) {
            throw CustomError.internalServer( `${error}` );
        }
    }

    /**
     * Busca una reserva por su identificador único.
     * 
     * @async
     * @param {string | number} id - ID de la reserva.
     * @returns {Promise<IReservation|null>} La reserva encontrada o `null` si no existe.
     * @throws {CustomError.internalServer} Si ocurre un error durante la búsqueda.
     */
    async findById(id: string | number): Promise<IReservation|null> {
        try {
            const reservation = await ReservationModel.findById( id ).populate("to_user sports_venue");
            return reservation ? ReservationEntity.from_json( reservation! ) : null;
        } catch (error) {
            throw CustomError.internalServer( `${error}`);
        }
    }

    /**
     * Busca una reserva por su ID y el ID del usuario propietario.
     * 
     * @async
     * @param {string | number} id - ID de la reserva.
     * @param {string | number} id_user - ID del usuario que realizó la reserva.
     * @returns {Promise<IReservation|null>} La reserva encontrada o `null` si no coincide con el usuario.
     * @throws {CustomError.internalServer} Si ocurre un error durante la búsqueda.
     */
    async findByIdByUser(id: string | number, id_user: string | number): Promise<IReservation|null> {
        try {
            const reservation = await ReservationModel.findOne({ _id: id, to_user: id_user}).populate("to_user sports_venue");
            return reservation ? ReservationEntity.from_json( reservation! ) : null;
        } catch (error) {
            throw CustomError.internalServer( `${error}`);
        }
    }

    /**
     * Obtiene todas las reservas asociadas a un espacio deportivo.
     * 
     * @async
     * @param {string | number} id - ID del espacio deportivo.
     * @returns {Promise<IReservation[]>} Lista de reservas asociadas al espacio.
     * @throws {CustomError.internalServer} Si ocurre un error al consultar.
     */
    async findBySportVenue(id: string | number): Promise<IReservation[]> {
        try {
            const reservations = await ReservationModel.find({ sports_venue: id }).populate("to_user sports_venue");
            return reservations.map( ReservationEntity.from_json );
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    /**
     * Obtiene las reservas de un espacio deportivo realizadas por un usuario específico.
     * 
     * @async
     * @param {string | number} id - ID del espacio deportivo.
     * @param {string | number} user - ID del usuario.
     * @returns {Promise<IReservation[]>} Reservas filtradas por espacio y usuario.
     * @throws {CustomError.internalServer} Si ocurre un error al consultar.
     */
    async findBySportVenueAndUser(id: string | number, user: string | number): Promise<IReservation[]> {
        try {
            const reservations = await ReservationModel.find({ sports_venue: id, to_user: user }).populate("to_user sports_venue");
            return reservations.map( ReservationEntity.from_json );
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    /**
     * Crea una nueva reserva en la base de datos.
     * 
     * @async
     * @param {IReservation} resevation - Objeto con los datos de la nueva reserva.
     * @returns {Promise<IReservation>} La reserva creada.
     * @throws {CustomError.internalServer} Si ocurre un error durante la creación.
     */
    async create(resevation: IReservation): Promise<IReservation> {
        try {
            const data = await ReservationModel.create( resevation );
            const find = ReservationEntity.from_json( data );
            const reservation = await this.findById(find.id!);
            return reservation!; 
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


    /**
     * Actualiza una reserva existente.
     * 
     * @async
     * @param {string | number} id - ID de la reserva a actualizar.
     * @param {IReservation} reservation - Datos actualizados de la reserva.
     * @returns {Promise<IReservation>} La reserva actualizada.
     * @throws {CustomError.internalServer} Si ocurre un error durante la actualización.
     */
    async update(id: string|number, reservation: IReservation): Promise<IReservation> {
        try {
            const update = await ReservationModel.findByIdAndUpdate(id, { ...reservation }, { new: true }).populate("to_user sports_venue");
            return ReservationEntity.from_json( update! );
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    /**
     * Realiza una eliminación lógica (soft delete) de una reserva, 
     * cambiando su estado a "cancelled" y confirmación a `false`.
     * 
     * @async
     * @param {string | number} id - ID de la reserva a cancelar.
     * @returns {Promise<boolean>} `true` si la operación fue exitosa.
     * @throws {CustomError.internalServer} Si ocurre un error durante la actualización.
     */
    async deleteSoft(id: string | number): Promise<boolean> {
        try{
            await ReservationModel.findByIdAndUpdate(id, { status: "cancelled", confirm_reservation: false}).populate("sports_venue to_user")
            return true;
        }catch( error ){
            throw CustomError.internalServer(`${error}`);
        }
    }

    /**
     * Elimina una reserva permanentemente de la base de datos.
     * 
     * @async
     * @param {string | number} id - ID de la reserva a eliminar.
     * @returns {Promise<boolean>} `true` si la reserva fue eliminada correctamente.
     * @throws {CustomError.internalServer} Si ocurre un error durante la eliminación.
     */
    async delete(id: string | number): Promise<boolean> {
        try{
            await ReservationModel.findByIdAndDelete(id)
            return true;
        }catch( error ){
            throw CustomError.internalServer(`${error}`);
        }
    }
}
