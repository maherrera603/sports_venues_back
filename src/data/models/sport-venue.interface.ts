/**
 * Representa un escenario deportivo disponible para reservas.
 */
export interface ISportVenue {
    /**
     * Identificador único del escenario.
     * Puede ser generado por la base de datos (Mongo ObjectId o auto-incremental en SQL).
     */
    id?: number | string;
    
    /**
     * Nombre del escenario deportivo.
     * Ejemplo: "Cancha Sintética A".
     */
    name?: string;

    /**
     * Ubicación o descripción del lugar donde se encuentra el escenario.
     * Ejemplo: "Coliseo Central - Piso 1".
     */
    venue?: string;

    /**
     * Estado de disponibilidad del escenario.
     * `true` = disponible para reservas.
     * `false` = ocupado o inhabilitado.
     */
    available?: boolean;

    /**
     * Identificador del usuario administrador o propietario del escenario.
     * Relación con la entidad `User`.
     */
    userId?: number | string;

    /**
     * Fecha de creación del registro.
     * Asignada automáticamente por la base de datos o el ORM.
     */
    createdAt?: Date;

    /**
     * Fecha de la última actualización del registro.
     * Se actualiza automáticamente en cada modificación.
     */
    updatedAt?: Date;
}