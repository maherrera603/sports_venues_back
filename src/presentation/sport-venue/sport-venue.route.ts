import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { Role } from "@/domain/enum";
import { SportVenueController } from "@/presentation/sport-venue";
import { SportVenueDatasourceImp } from "@/infraestructure/datasources/mongo/sport-venue.datasource.imp";
import { SportVenueRepositoryImp } from "@/infraestructure/repositories/sport-venue.repository.imp";


/**
 * Define las rutas HTTP relacionadas con la gestión de escenarios deportivos.
 *
 * Cada ruta está protegida mediante el middleware de autenticación y
 * restringida según los roles de usuario permitidos.
 *
 * Controlador principal: {@link SportVenueController}
 */
export class SportVenueRoutes{

    /**
     * Inicializa y devuelve las rutas configuradas para escenarios deportivos.
     *
     * Endpoints disponibles:
     * - **GET /** → Obtiene todos los escenarios (solo ADMIN).
     * - **GET /:id** → Obtiene un escenario por ID (ADMIN, USER).
     * - **GET /available/:available** → Filtra escenarios por disponibilidad (ADMIN, USER).
     * - **POST /** → Crea un nuevo escenario deportivo (solo ADMIN).
     * - **PUT /:id** → Actualiza un escenario existente (solo ADMIN).
     * - **DELETE /:id** → Elimina un escenario (solo ADMIN).
     *
     * @returns {Router} Router con todas las rutas registradas.
     */
    public static get routes(): Router{

        const sportDatasource = new SportVenueDatasourceImp();
        const sportRepository = new SportVenueRepositoryImp( sportDatasource );

        const controller = new SportVenueController( sportRepository );

        const routes = Router();
        routes.get("/", AuthMiddleware.validation([ Role.ADMIN_ROLE]), controller.find );
        routes.get("/:id", AuthMiddleware.validation([Role.ADMIN_ROLE, Role.USER_ROLE]), controller.findById );
        routes.get("/available/:available", AuthMiddleware.validation([ Role.ADMIN_ROLE, Role.USER_ROLE]), controller.findByAvailable);
        routes.post("/", AuthMiddleware.validation([Role.ADMIN_ROLE]), controller.createSportVenue );
        routes.put("/:id", AuthMiddleware.validation([Role.ADMIN_ROLE]), controller.updateSportVenue );
        routes.delete("/:id", AuthMiddleware.validation([ Role.ADMIN_ROLE ]), controller.deleteSportVenue );
        // TODO: crear end-point para subir imagen y obtener imagen

        return routes;
    }
}