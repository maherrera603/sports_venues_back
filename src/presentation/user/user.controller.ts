import { DeleteUserUseCase, FindUserByIdUseCase, UpdateUserUseCase } from "@/application/useCases/user";
import { UpdateUserDTO } from "@/domain/dtos/user";
import { CustomError } from "@/domain/errors";
import { UserRepository } from "@/domain/repositories";
import { NextFunction, Request, Response } from "express";


/**
 * Controlador encargado de manejar las operaciones relacionadas con el usuario.
 * 
 * Expone endpoints para:
 * - Obtener información de un usuario por su ID.
 * - Actualizar los datos de un usuario autenticado.
 * - Eliminar un usuario del sistema.
 */
export class UserController {
    private findByIdUseCase: FindUserByIdUseCase;
    private updateUserUseCase: UpdateUserUseCase; 
    private deleteUserUseCase: DeleteUserUseCase


    /**
     * Inicializa el controlador con las dependencias necesarias.
     * 
     * @param userRespository - Repositorio de usuarios que provee el acceso a datos.
     */
    constructor( private readonly userRespository: UserRepository ){
        this.findByIdUseCase = new FindUserByIdUseCase( this.userRespository );
        this.updateUserUseCase = new UpdateUserUseCase( this.userRespository );
        this.deleteUserUseCase = new DeleteUserUseCase( this.userRespository );

    }

    /**
     * Obtiene los datos del usuario autenticado mediante su ID.
     * 
     * @route GET /user/profile
     * @param req - Objeto de la petición de Express (se espera `req.user.id`).
     * @param res - Objeto de la respuesta de Express.
     * @param next - Función para pasar el control al siguiente middleware en caso de error.
     */
    public findUserById = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.user;

        return this.findByIdUseCase.execute( id )
            .then( resp => res.status(resp.code).json( resp))
            .catch( error => next( error ));
    }

    
    /**
     * Actualiza los datos del usuario autenticado.
     * 
     * @route PUT /user/profile
     * @param req - Objeto de la petición de Express (contiene `req.user.id` y `req.body` con los datos a actualizar).
     * @param res - Objeto de la respuesta de Express.
     * @param next - Función para pasar el control al siguiente middleware en caso de error.
     * 
     * @throws {CustomError.badRequest} Si los datos enviados no cumplen con las validaciones.
     */
    public updateUser = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.user;

        const [ error, user] = UpdateUserDTO.validate_fields( req.body );
        if( error ) throw CustomError.badRequest( error );

        user!.id = id;

        return this.updateUserUseCase.execute( user! )
            .then( resp => res.status( resp.code ).json( resp ))
            .catch( error => next( error));
    }

    /**
     * Elimina la cuenta del usuario autenticado.
     * 
     * @route DELETE /user/profile
     * @param req - Objeto de la petición de Express (se espera `req.user.id`).
     * @param res - Objeto de la respuesta de Express.
     * @param next - Función para pasar el control al siguiente middleware en caso de error.
     */
    public deleteUser = ( req: Request, res: Response, next: NextFunction ) => {
        const { id } = req.user;

        return this.deleteUserUseCase.execute( id )
            .then( resp => res.status( resp.code).json( resp ))
            .catch( error => next( error ));
    }
}