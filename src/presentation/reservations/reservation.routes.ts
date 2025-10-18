import { Router } from "express";
import { ReservationController } from "@/presentation/reservations/reservation.controller";
import { ReservationRepositoryImp, UserRepositoryImp } from "@/infraestructure/repositories";
import { ReservationDatasourceImp, UserDatasourceImp } from "@/infraestructure/datasources/mongo";
import { AuthMiddleware } from "@/presentation/middlewares";
import { Role } from "@/domain/enum";

/**
 * @class ReservationRoutes
 * @description
 * Clase encargada de definir las rutas relacionadas con el módulo de **reservas (reservations)**.
 * 
 * Esta clase centraliza la configuración de endpoints asociados al manejo de reservas,
 * delegando la lógica de negocio al `ReservationController`.  
 * 
 * Se utiliza un método estático `routes` para permitir su uso directo
 * sin necesidad de instanciar la clase.
 */
export class ReservationRoutes {

    /**
     * @method routes
     * @static
     * @returns {Router} Instancia del enrutador de Express con todas las rutas de reservas configuradas.
     * 
     * @description
     * Este método crea un nuevo router de Express y registra los endpoints que serán manejados por
     * el `ReservationController`.  
     * 
     * Actualmente solo instancia el controlador, pero se espera que defina rutas como:
     * - `GET /` → Obtener todas las reservas.
     * - `GET /:id` → Obtener una reserva específica.
     * - `POST /` → Crear una nueva reserva.
     * - `PUT /:id` → Actualizar una reserva existente.
     * - `DELETE /:id` → Eliminar una reserva.
     */
    public static get routes(): Router {
        const userDatasource = new UserDatasourceImp();
        const datasource = new ReservationDatasourceImp();

        const repository = new ReservationRepositoryImp( datasource );
        const userRepository = new UserRepositoryImp( userDatasource );
        const controller = new ReservationController( repository, userRepository );


        const routes = Router();
        routes.post("/", AuthMiddleware.validation([Role.USER_ROLE]), controller.create);
        routes.get("/", AuthMiddleware.validation([ Role.ADMIN_ROLE]), controller.find);
        routes.get("/user", AuthMiddleware.validation([ Role.USER_ROLE]), controller.findByUser);
        routes.get("/:id", AuthMiddleware.validation([ Role.USER_ROLE, Role.ADMIN_ROLE]), controller.findById);
        routes.get("/sport-venues/:id", AuthMiddleware.validation([ Role.ADMIN_ROLE, Role.USER_ROLE]), controller.findBySportVenues);
        routes.put("/:id", AuthMiddleware.validation([Role.ADMIN_ROLE]),  controller.update);
        routes.delete("/soft-delete/:id", AuthMiddleware.validation([ Role.USER_ROLE]), controller.softDelete);
        routes.delete("/:id", AuthMiddleware.validation([ Role.ADMIN_ROLE]), controller.delete);
        return routes;
    }
}