import { ISportVenue } from "@/data/models";
import { SportVenueDatasource } from "@/domain/datasources";
import { SportVenueRepository } from "@/domain/repositories";

/**
 * Implementación del repositorio de escenarios deportivos.
 *
 * Esta clase actúa como un adaptador entre la capa de dominio
 * (a través de la interfaz {@link SportVenueRepository}) y la capa de
 * infraestructura/datos (a través de la interfaz {@link SportVenueDatasource}).
 *
 * Permite que la lógica de negocio interactúe con la base de datos
 * de manera desacoplada, delegando las operaciones CRUD a la fuente
 * de datos concreta que se inyecte en el constructor.
 */
export class SportVenueRepositoryImp implements SportVenueRepository {

    /**
     * Crea una nueva instancia de SportVenueDatasourceImp.
     * @param sportDatasource Implementación concreta de {@link SportVenueDatasource}.
     */
    constructor( private readonly sportDatasource: SportVenueDatasource ){}
    
    /** @inheritdoc */
    find(): Promise<ISportVenue[]> {
        return this.sportDatasource.find();
    }

    /** @inheritdoc */
    findById(id: string): Promise<ISportVenue | null> {
        return this.sportDatasource.findById( id );
    }

    /** @inheritdoc */
    findByAvailable(available: boolean): Promise<ISportVenue[]> {
        return this.sportDatasource.findByAvailable( available );
    }

    /** @inheritdoc */
    findByNameAndVenue(name: string, venue: string): Promise<ISportVenue|null> {
        return this.sportDatasource.findByNameAndVenue( name, venue );
    }

    /** @inheritdoc */
    createSportVenue(sportVenue: ISportVenue): Promise<ISportVenue> {
        return this.sportDatasource.createSportVenue( sportVenue );
    }

    /** @inheritdoc */
    updateSportVenue(sportVenue: ISportVenue): Promise<ISportVenue> {
        return this.sportDatasource.updateSportVenue( sportVenue );
    }

    /** @inheritdoc */
    deleteSportVenue(id: string|number ): Promise<boolean> {
        return this.sportDatasource.deleteSportVenue( id );
    }
}