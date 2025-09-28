import { ISportVenue } from "@/data/models";



/**
 * Entidad que representa un escenario deportivo dentro del dominio.
 *
 * Esta clase se encarga de transformar datos sin tipar (generalmente
 * provenientes de JSON, como en respuestas HTTP o consultas a la BD)
 * en objetos fuertemente tipados de acuerdo con la interfaz {@link ISportVenue}.
 */
export class SportVenueEntity {


    /**
     * Convierte un objeto genérico en una entidad tipada {@link ISportVenue}.
     *
     * @param data Objeto con los datos crudos del escenario deportivo.
     * Puede provenir de un request, respuesta HTTP o de la base de datos.
     * @returns Objeto tipado como {@link ISportVenue}.
     */
    public static from_json( data: {[key: string]:any}): ISportVenue{
        const {id, name, venue, available, userId} = data;
        return {id, name, venue, available, userId } as ISportVenue;
    }
}