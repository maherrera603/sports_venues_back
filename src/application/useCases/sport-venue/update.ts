import { ISportVenue } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";

/**
 * Caso de uso: Actualizar un SportVenue existente.
 *
 * Esta clase se encarga de gestionar la lógica para actualizar
 * la información de un lugar deportivo en el sistema.
 * 
 * Verifica previamente si el registro existe en el repositorio
 * y, en caso de no encontrarlo, lanza un error de tipo `CustomError.notFound`.
 */
export class UpdateSportVenueUseCase {

     /**
     * Inicializa la clase con la dependencia del repositorio.
     * 
     * @param sportRepository - Implementación del repositorio que maneja
     * las operaciones de persistencia para SportVenues.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    /**
     * Ejecuta el proceso de actualización de un SportVenue.
     * 
     * @param sportVenue - Objeto con la información actualizada del lugar deportivo.
     * @returns Una promesa con un objeto {@link IResponse} que contiene el SportVenue actualizado.
     * 
     * @throws {CustomError.notFound} Si no existe un registro con el ID especificado.
     */
    public async execute( sportVenue: ISportVenue ): Promise<IResponse<ISportVenue>>{
        const exists = await this.sportRepository.findById( sportVenue.id! );
        if( !exists) throw CustomError.notFound(`el registro con el id: ${ sportVenue.id} no existe`);

        const sport = await this.sportRepository.updateSportVenue( sportVenue );
        return {
            code: 200,
            status: "OK",
            message: "el registro ha sido actualizado!!",
            data: sport
        }
    }
}