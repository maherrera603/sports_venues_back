import { IReservation } from "@/data/models";
import { IReservationDatasource } from "@/domain/datasources";
import { IReservationRepository } from "@/domain/repositories";

export class ReservationRepositoryImp implements IReservationRepository {

    constructor( private readonly reservationDatasource: IReservationDatasource ){}

    /** @inheritdoc */
    find(): Promise<IReservation[]> {
        return this.reservationDatasource.find();
    }

    /** @inheritdoc */
    findByUser( user: string | number): Promise<IReservation[]> {
        return this.reservationDatasource.findByUser( user );
    }

    /** @inheritdoc */
    findById(id: string | number): Promise<IReservation|null> {
        return this.reservationDatasource.findById( id );
    }
    
    /** @inheritdoc */
    findByIdByUser(id: string | number, id_user: string | number): Promise<IReservation|null> {
        return this.reservationDatasource.findByIdByUser( id, id_user);
    }

    /** @inheritdoc */
    findBySportVenue(id: string | number): Promise<IReservation[]> {
        return this.reservationDatasource.findBySportVenue( id );
    }

    /** @inheritdoc */
    findBySportVenueAndUser(id: string | number, user: string | number): Promise<IReservation[]> {
        return this.reservationDatasource.findBySportVenueAndUser( id, user);
    }

    /** @inheritdoc */
    create(resevation: IReservation): Promise<IReservation> {
        return this.reservationDatasource.create( resevation );
    }

    /** @inheritdoc */
    update(id: string|number, reservation: IReservation): Promise<IReservation> {
        return this.reservationDatasource.update( id, reservation );
    }

    /** @inheritdoc */
    deleteSoft(id: string | number): Promise<boolean> {
        return this.reservationDatasource.deleteSoft( id);
    }

    /** @inheritdoc */
    delete(id: string | number): Promise<boolean> {
        return this.reservationDatasource.delete( id);
    }

}