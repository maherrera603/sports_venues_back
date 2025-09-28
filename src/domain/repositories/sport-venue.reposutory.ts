import { ISportVenue } from "@/data/models";


/**
 * Contrato de operaciones que deben implementarse
 * para la gestión de escenarios deportivos en la capa de datos.
 */
export interface SportVenueRepository {
    /**
     * Obtiene todos los escenarios deportivos.
     */
    find(): Promise<ISportVenue[]>;

    /**
     * Busca un escenario por su identificador único.
     * @param id Identificador del escenario.
     * @returns Escenario encontrado o `null` si no existe.
     */
    findById( id: string | number ): Promise<ISportVenue|null>;

    /**
     * Obtiene todos los escenarios filtrados por su disponibilidad.
     * @param available `true` si están disponibles, `false` si no.
     */
    findByAvailable(available: boolean): Promise<ISportVenue[]>;

    /**
     * Busca un SportVenue por nombre y avenida.
     *
     * Permite consultar un registro específico en la capa de persistencia
     * usando como criterios de búsqueda el `name` y el `avenue`.
     *
     * @param name - Nombre del lugar deportivo.
     * @param venue - Avenida o dirección principal del lugar deportivo.
     * @returns Una promesa que resuelve en un objeto {@link ISportVenue} si el registro existe,
     * o `null` si no se encuentra.
     */
    findByNameAndVenue( name: string, venue: string): Promise<ISportVenue|null>;

    /**
     * Crea un nuevo escenario deportivo.
     * @param sportVenue Datos del escenario a crear.
     */
    createSportVenue( sportVenue: ISportVenue): Promise<ISportVenue>;

    /**
     * Actualiza un escenario deportivo existente.
     * @param sportVenue Datos a modificar (pueden ser parciales).
     */
    updateSportVenue( sportVenue: ISportVenue ): Promise<ISportVenue>;

    /**
     * Elimina un escenario deportivo por su identificador.
     * @param id Identificador del escenario.
     * @returns `true` si la eliminación fue exitosa, `false` en caso contrario.
     */
    deleteSportVenue( id: string|number ): Promise<boolean>;
}