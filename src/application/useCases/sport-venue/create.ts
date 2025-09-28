import { ISportVenue } from "@/data/models";
import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces";
import { SportVenueRepository } from "@/domain/repositories";



/**
 * Caso de uso: Crear un nuevo SportVenue en el sistema.
 *
 * Se encarga de validar que no exista previamente un registro duplicado
 * (según la lógica de negocio definida en el repositorio) y, en caso contrario,
 * procede a crear el recurso en la capa de persistencia.
 */
export class CreateSportVenueUseCase {

    /**
     * @param sportRepository - Repositorio que provee el acceso a datos de SportVenue.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){}


    
    /**
     * Ejecuta la creación de un nuevo SportVenue.
     *
     * @param sportVenue - Objeto de tipo {@link ISportVenue} que contiene los datos del nuevo registro.
     * @returns Una promesa que resuelve en un objeto de tipo {@link IResponse} con el registro creado.
     *
     * @throws {CustomError} - Lanza un error de conflicto (409) si ya existe un registro duplicado.
     * @throws {Error} - Puede lanzar errores inesperados provenientes de la capa de persistencia.
     */
    public async execute( sportVenue: ISportVenue): Promise<IResponse<ISportVenue >>{

        const exists = await this.sportRepository.findByNameAndVenue( sportVenue.name!, sportVenue.venue! );
        if(exists) throw CustomError.conflict("el registro ya existe");

        const sport = await this.sportRepository.createSportVenue( sportVenue )

        return {
            code: 201,
            status: "Created",
            message: "registro creado con exito!!",
            data: sport
        }
    }
}