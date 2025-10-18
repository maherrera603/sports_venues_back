import { CustomError } from "@/domain/errors";
import { IResponse } from "@/domain/interfaces/response.interface";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware para el manejo centralizado de errores en Express.
 * Detecta si el error es una instancia de CustomError y responde con el codigo y mensaje adecuados.
 * En caso contrario, responde con un error generico 500 (Internal Server Error)
 */
export class ErrorMiddleware {
    /**
     * Maneja los errores lanzados en las rutas Express
     * @param { Error } error 
     * @param { Request } req 
     * @param { Response } res 
     * @param { NextFunction } next 
     * @returns Respuesta JSON con el codigo, estado y mensaje del error
     */
    public static handle( error: Error, req: Request, res: Response, next: NextFunction):Response<IResponse> {
        if( !(error instanceof CustomError) ) {
            return res.status(500).json({
                code: 500,
                status: "Internal-Server",
                message: error.message.replace("TypeError:", "")
            });
        }

        return res.status(error.code).json({
            code: error.code,
            status: error.status,
            message: error.message.replace("TypeError: ", "").replace("Error: ", "")
        });
    }
}