import { CreateSportVenueUseCase, 
    DeleteSportVenueUseCase, 
    FindByAvailableSportVenueUseCase, 
    FindByIdSportVenueUseCase, 
    FindSportsVenueUseCase, 
    UpdateSportVenueUseCase 
} from "@/application/useCases/sport-venue";
import { CreateSportVenueDTO, UpdateSportVenueDTO } from "@/domain/dtos/sport-venue";
import { CustomError } from "@/domain/errors";
import { SportVenueRepository } from "@/domain/repositories";
import { NextFunction, Request, Response } from "express";


/**
 * Controlador encargado de gestionar las operaciones HTTP
 * relacionadas con los escenarios deportivos.
 *
 * Cada método se conecta con un caso de uso (UseCase) específico,
 * validando la entrada de datos mediante DTOs cuando es necesario
 * y gestionando las respuestas y errores.
 */
export class SportVenueController {
    private findUseCase: FindSportsVenueUseCase;
    private findByIdUseCase: FindByIdSportVenueUseCase;
    private findByAvailableUseCase: FindByAvailableSportVenueUseCase;
    private createUseCase: CreateSportVenueUseCase;
    private updateUseCase: UpdateSportVenueUseCase;
    private deleteUseCase: DeleteSportVenueUseCase;


    /**
     * Inicializa el controlador con el repositorio de escenarios deportivos.
     * @param sportRepository Repositorio que gestiona la persistencia de escenarios.
     */
    constructor( private readonly sportRepository: SportVenueRepository ){
        this.findUseCase = new FindSportsVenueUseCase( this.sportRepository);
        this.findByIdUseCase = new FindByIdSportVenueUseCase( this.sportRepository );
        this.findByAvailableUseCase = new FindByAvailableSportVenueUseCase( this.sportRepository );
        this.createUseCase = new CreateSportVenueUseCase( this.sportRepository );
        this.updateUseCase = new UpdateSportVenueUseCase( this.sportRepository );
        this.deleteUseCase = new DeleteSportVenueUseCase( this.sportRepository );
    }

    /**
     * Obtiene todos los escenarios deportivos.
     * - Ruta: **GET /**
     */
    public find = ( req: Request, res: Response, next: NextFunction ) => {

        this.findUseCase.execute()
            .then( resp => res.status( resp.code ).json( resp ))
            .catch( error => next( error ));
    }

    /**
     * Busca un escenario deportivo por su identificador.
     * - Ruta: **GET /:id**
     * @param req.params.id ID del escenario a consultar.
     */
    public findById = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;
        this.findByIdUseCase.execute( String(id) )
            .then( resp => res.status( resp.code ).json( resp ))
            .catch( error => next( error ));
    }

    /**
     * Filtra escenarios por su disponibilidad.
     * - Ruta: **GET /available/:available**
     * @param req.params.available Valor booleano (`true` o `false`).
     */
    public findByAvailable = ( req: Request, res: Response, next: NextFunction ) => {
        const { available } = req.params;
        this.findByAvailableUseCase.execute( available === "true" )
            .then( resp => res.status( resp.code ).json( resp ))
            .catch( error => next( error ));
    }

    /**
     * Crea un nuevo escenario deportivo.
     * - Ruta: **POST /**
     * - Valida datos de entrada con {@link CreateSportVenueDTO}.
     * - Asocia el escenario al usuario autenticado.
     */
    public createSportVenue = ( req: Request, res: Response, next: NextFunction ) => {

        const [ error, sportVenue] = CreateSportVenueDTO.validate_fields( req.body );
        if( error ) throw CustomError.badRequest( error );

        const { id } = req.user;
        sportVenue!.userId = id;

        this.createUseCase.execute( sportVenue! )
            .then( resp => res.status( resp.code).json( resp ))
            .catch( error => next( error ));
    }

    /**
     * Actualiza un escenario deportivo existente.
     * - Ruta: **PUT /:id**
     * - Valida datos de entrada con {@link UpdateSportVenueDTO}.
     * - Solo usuarios autenticados pueden modificar sus registros.
     */
    public updateSportVenue = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;

        const [ error, sportVenue] = UpdateSportVenueDTO.validate_fields( req.body );
        if( error ) throw CustomError.badRequest( error );

        sportVenue!.id = String(id);
        sportVenue!.userId = req.user.id;

        this.updateUseCase.execute( sportVenue! )
            .then( resp => res.status( resp.code).json( resp ))
            .catch( error => next( error ));
    }

    /**
     * Elimina un escenario deportivo por ID.
     * - Ruta: **DELETE /:id**
     * @param req.params.id ID del escenario a eliminar.
     */
    public deleteSportVenue = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.params;
        this.deleteUseCase.execute( String(id) )
            .then( resp => res.status( resp.code ).json( resp ))
            .catch( error => next( error ));
    }

    // TODO: implementar end-point para actualizar imagen y obtener
}