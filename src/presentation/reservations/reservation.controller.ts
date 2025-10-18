
import { CreateReservationUseCase, 
    FindReservationUseCase, 
    FindByUserReservationUserCase, 
    FindByIdReservationUseCase,
    FindBySportVenueReservationUseCase,
    UpdateReservationUseCase,
    SoftDeleteReservationUseCase,
    DeleteReservationUseCase
} from "@/application/useCases/reservation";
import { CreateReservationDTO, UpdateReservationDTO } from "@/domain/dtos/reservations";
import { CustomError } from "@/domain/errors";
import { IReservationRepository, UserRepository } from "@/domain/repositories";
import { NextFunction, Request, Response } from "express";



/**
 * @class ReservationController
 * @description
 * Controlador que maneja todas las operaciones relacionadas con las reservas deportivas.
 * 
 * Este controlador sirve como intermediario entre las rutas HTTP (Express)
 * y los casos de uso de la capa de aplicación. Se encarga de validar la entrada,
 * invocar el caso de uso correspondiente y retornar una respuesta formateada.
 * 
 * Los métodos implementan los principios de la arquitectura limpia, manteniendo
 * la lógica de negocio dentro de los casos de uso y no en el controlador.
 */
export class ReservationController {
    private createCase:CreateReservationUseCase;
    private findCase: FindReservationUseCase;
    private findByUserCase: FindByUserReservationUserCase;
    private findByIdCase: FindByIdReservationUseCase;
    private findBySportVenuesCase: FindBySportVenueReservationUseCase;
    private updateCase: UpdateReservationUseCase;
    private softDeleteCase: SoftDeleteReservationUseCase;
    private deleteCase: DeleteReservationUseCase;
    

    /**
     * @constructor
     * @param {IReservationRepository} reservationRepository - Repositorio de reservas que implementa las operaciones del dominio.
     * @param {UserRepository} userRepository - Repositorio de usuarios necesario para operaciones que involucran relaciones con usuarios.
     */
    constructor( 
        private readonly reservationRepository: IReservationRepository,
        private readonly userRepository: UserRepository,
    ){
        this.createCase = new CreateReservationUseCase( this.reservationRepository, this.userRepository );
        this.findCase = new FindReservationUseCase( this.reservationRepository );
        this.findByUserCase = new FindByUserReservationUserCase( this.reservationRepository );
        this.findByIdCase = new FindByIdReservationUseCase( this.reservationRepository);
        this.findBySportVenuesCase = new FindBySportVenueReservationUseCase( this.reservationRepository );
        this.updateCase = new UpdateReservationUseCase( this.reservationRepository );
        this.softDeleteCase = new SoftDeleteReservationUseCase( this.reservationRepository);
        this.deleteCase = new DeleteReservationUseCase( this.reservationRepository);

    }

    /**
     * @method create
     * @description
     * Crea una nueva reserva deportiva.
     * 
     * @route POST /reservations
     * @param {Request} req - Objeto de solicitud con los datos de la reserva en el cuerpo (`req.body`).
     * @param {Response} res - Objeto de respuesta Express.
     * @param {NextFunction} next - Función para manejo de errores.
     * 
     * @throws {CustomError.badRequest} Si los campos enviados son inválidos.
     */
    create = (req: Request, res: Response, next:NextFunction) => {
        const [ error, reservation] = CreateReservationDTO.validate_fields(req.body);
        if( error ) throw CustomError.badRequest( error);

        reservation!.to_user = req.user.id;

        this.createCase.execute( reservation! )
            .then( resp => res.status( resp.code).json( resp ))
            .catch( error => next( error ));
    }


    /**
     * @method find
     * @description
     * Obtiene todas las reservas registradas en el sistema.
     * 
     * @route GET /reservations
     */
    find = (req: Request, res: Response, next: NextFunction) => {

        this.findCase.execute()
            .then( resp => res.status( resp.code).json(resp))
            .catch( next );

    }


    /**
     * @method findByUser
     * @description
     * Obtiene todas las reservas realizadas por el usuario autenticado.
     * 
     * @route GET /reservations/user
     */
    findByUser = (req: Request, res: Response, next: NextFunction ) => {
        const { id  } = req.user;

        this.findByUserCase.execute( id)
            .then( resp => res.status( resp.code).json(resp))
            .catch( next );
    }

     /**
     * @method findById
     * @description
     * Busca una reserva específica por su ID.
     * 
     * @route GET /reservations/:id
     */
    findById = (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        this.findByIdCase.execute( id!, req.user)
            .then( resp => res.status(resp.code).json( resp ))
            .catch( next );
    }

    /**
     * @method findBySportVenues
     * @description
     * Obtiene las reservas asociadas a un espacio deportivo específico.
     * 
     * @route GET /reservations/sport-venue/:id
     */
    findBySportVenues = (req: Request, res: Response, next: NextFunction) => {
        const  { id } = req.params;

        this.findBySportVenuesCase.execute(id!, req.user)
            .then( resp => res.status( resp.code).json( resp ))
            .catch( next );
    }

    /**
     * @method update
     * @description
     * Actualiza los datos de una reserva existente.
     * 
     * @route PUT /reservations/:id
     */
    update = ( req:Request, res:Response,  next: NextFunction) =>  {
        const { id }   = req.params;

        const [ error, reservation] = UpdateReservationDTO.validate_fields( req.body );
        if( error ) throw CustomError.badRequest(error);

        this.updateCase.execute(id!, reservation! )
            .then(resp => res.status( resp.code ).json( resp ))
            .catch( next );
    } 


    /**
     * @method softDelete
     * @description
     * Cancela una reserva (eliminación lógica). Solo el usuario que la creó puede hacerlo.
     * 
     * @route PATCH /reservations/:id/cancel
     */
    softDelete = ( req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const {user} = req;

        this.softDeleteCase.execute( id!, user.id )
            .then(resp => res.status( resp.code ).json( resp ))
            .catch( next );
    }

    /**
     * @method delete
     * @description
     * Elimina permanentemente una reserva (acción reservada para administradores).
     * 
     * @route DELETE /reservations/:id
     */
    delete = ( req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        this.deleteCase.execute( id! )
            .then(resp => res.status( resp.code ).json( resp ))
            .catch( next );
    }
}