/**
 * Interfaz que define el formato estándar de las respuestas dentro de la aplicación.
 *
 * Se utiliza para mantener consistencia en la comunicación entre casos de uso,
 * controladores y adaptadores de infraestructura.
 *
 * @typeParam T - Tipo de los datos devueltos en la respuesta. Por defecto es `any`.
 *
 * @property code - Código numérico asociado a la respuesta (ej. `200` = éxito, `400` = error de validación).
 * @property status - Estado textual de la respuesta (ej. `"success"`, `"error"`, `"fail"`).
 * @property message - Mensaje descriptivo que brinda contexto adicional sobre la operación realizada.
 * @property data - Datos opcionales asociados al resultado de la operación. 
 *                  Puede ser de cualquier tipo definido por `T`.
 */
export interface IResponse<T = any> {
    code: number;
    status: string;
    message: string;
    data?: T
}