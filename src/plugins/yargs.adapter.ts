import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface IArgv {
    email: string;
    password: string;
}

/**
 * Adaptador para la librería `yargs`.
 *
 * Esta clase se encarga de centralizar y tipar la obtención de argumentos
 * desde la línea de comandos (CLI). Define opciones requeridas para 
 * `email` y `password`, y expone un acceso sencillo a través de la propiedad `arguments`.
 *
 * ### Ejemplo de uso en CLI:
 * ```bash
 * node dist/app.js -e usuario@dominio.com -p 123456
 * ```
 *
 * ### Ejemplo de acceso en código:
 * ```ts
 * const { email, password } = YargAdapter.arguments;
 * console.log(email, password);
 * ```
 */
export class YargAdapter {


    /**
     * Obtiene y parsea los argumentos de la línea de comandos.
     *
     * Define las siguientes opciones obligatorias:
     * - `-e, --email`: Dirección de correo electrónico del usuario.
     * - `-p, --password`: Contraseña asociada al usuario.
     *
     * @returns {IArgv} Objeto con los argumentos `email` y `password`.
     *
     * @throws Error si no se proporcionan los argumentos requeridos.
     */
    public static get arguments(): IArgv {
        const yarg = yargs( hideBin( process.argv ))
            .option("e", {
                alias: "email",
                type: "string",
                demandOption: true,
                describe: "email is required"
            })
            .option( "p", {
                alias: "password",
                type: "string",
                demandOption: true,
                describe: "password is required"
            })
            .parseSync();

        return { email: yarg.e, password: yarg.p}
    }
}