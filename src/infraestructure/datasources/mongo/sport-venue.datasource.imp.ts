import { ISportVenue } from "@/data/models";
import { SportVenueModel } from "@/data/schemas";
import { SportVenueDatasource } from "@/domain/datasources";
import { SportVenueEntity } from "@/domain/entities";
import { CustomError } from "@/domain/errors";


/**
 * Implementación de la fuente de datos para la gestión de espacios deportivos (Sport Venues).
 * 
 * Esta clase se encarga de interactuar con la base de datos MongoDB utilizando Mongoose 
 * a través del modelo `SportVenueModel`. Implementa la interfaz `SportVenueDatasource` 
 * para garantizar la abstracción de las operaciones.
 * 
 * Maneja las siguientes operaciones:
 * - Consultar todos los espacios deportivos.
 * - Consultar un espacio deportivo por ID.
 * - Consultar espacios deportivos por disponibilidad.
 * - Crear un nuevo espacio deportivo.
 * - Actualizar un espacio deportivo existente.
 * - Eliminar un espacio deportivo por ID.
 * 
 * Maneja errores mediante `CustomError` para 
 * estandarizar la respuesta en caso de fallos.
 * 
 * Notas sobre timestamps:
 * - `createdAt`: Fecha de creación del registro (asignada automáticamente al crear).
 * - `updatedAt`: Fecha de última actualización (se actualiza manualmente en `updateSportVenue`).
 * 
 * @class SportVenueDatasourceImp
 * @implements {SportVenueDatasource}
 */
export class SportVenueDatasourceImp implements SportVenueDatasource {


    /**
     * Obtiene todos los espacios deportivos registrados.
     * 
     * @returns {Promise<ISportVenue[]>} Lista de espacios deportivos.
     * @throws {CustomError} Si no existen datos.
     */
    async find(): Promise<ISportVenue[]> {
        try {
            const venues = await SportVenueModel.find();
            return venues.map( SportVenueEntity.from_json );
        } catch (error) {
            throw CustomError.notFound("error: no existen datos");
        }
    }

    /**
     * Busca un espacio deportivo por su ID.
     * 
     * @param {string} id - Identificador único del espacio deportivo.
     * @returns {Promise<ISportVenue | null>} El espacio deportivo encontrado o null si no existe.
     * @throws {CustomError} Si no se encuentra ningún registro.
     */
    async findById(id: string): Promise<ISportVenue | null> {
        try{
            const venue = await SportVenueModel.findById({ _id: id});
            return venue ? SportVenueEntity.from_json( venue ) : null;
        }catch( error ){
            throw CustomError.notFound(`error: no se encontro ningun registro por el id: ${id}`);
        }
    }

    /**
     * Busca los espacios deportivos filtrados por disponibilidad.
     * 
     * @param {boolean} available - Indica si el espacio está disponible.
     * @returns {Promise<ISportVenue[]>} Lista de espacios deportivos disponibles o no.
     * @throws {CustomError} Si no hay espacios disponibles.
     */
    async findByAvailable(available: boolean): Promise<ISportVenue[]> {
        try {
            const venues = await SportVenueModel.find({ available });
            return venues.map( SportVenueEntity.from_json );
        } catch (error) {
            throw CustomError.notFound("error: no hay espacios deportivos disponibles");
        }
    }

    /**
     * Busca un SportVenue por nombre y avenida.
     *
     * Permite consultar un registro específico en la capa de persistencia
     * usando como criterios de búsqueda el `name` y el `avenue`.
     *
     * @param name - Nombre del lugar deportivo.
     * @param avenue - Avenida o dirección principal del lugar deportivo.
     * @returns Una promesa que resuelve en un objeto {@link ISportVenue} si el registro existe,
     * o `null` si no se encuentra.
     */
    async findByNameAndVenue(name: string, venue: string): Promise<ISportVenue|null> {
        try {
            const sport = await SportVenueModel.findOne({ name, venue });
            return sport ? SportVenueEntity.from_json( sport ) : null;
        } catch (error) {
            throw CustomError.notFound("error: no se encontraron registros")
        }
    }

    /**
     * Crea un nuevo espacio deportivo en la base de datos.
     * 
     * @param {ISportVenue} sportVenue - Datos del nuevo espacio deportivo.
     * @returns {Promise<ISportVenue>} El espacio deportivo creado.
     * @throws {CustomError} Si no se logra guardar el registro.
     */
    async createSportVenue(sportVenue: ISportVenue): Promise<ISportVenue> {
        try {
            const venue = await SportVenueModel.create({ ...sportVenue });
            return SportVenueEntity.from_json( venue );
        } catch (error) {
            throw CustomError.internalServer("error: no se logro guardar el registro")
        }
    }

    /**
     * Actualiza un espacio deportivo existente.
     * 
     * @param {ISportVenue} sportVenue - Datos actualizados del espacio deportivo.
     * @returns {Promise<ISportVenue>} El espacio deportivo actualizado.
     * @throws {CustomError} Si no se logra actualizar el registro.
     */
    async updateSportVenue(sportVenue: ISportVenue): Promise<ISportVenue> {
        try {
            const venue = await SportVenueModel.findByIdAndUpdate( sportVenue.id ,{ ...sportVenue, updatedAt: new Date() }, { new: true});
            return SportVenueEntity.from_json( venue! );
        } catch (error) {
            throw CustomError.internalServer("error: no se logro actualizar el registro")
        }
    }

    /**
     * Elimina un espacio deportivo por su ID.
     * 
     * @param {string} id - Identificador único del espacio deportivo.
     * @returns {Promise<boolean>} `true` si el espacio fue eliminado correctamente.
     * @throws {CustomError} Si no se logra eliminar el registro.
     */
    async deleteSportVenue(id: string|number): Promise<boolean> {
        try {
            await SportVenueModel.findByIdAndDelete( id );
            return true;
        } catch (error) {
            throw CustomError.internalServer("error: no se logro eliminar el registro")
        }
    }
}