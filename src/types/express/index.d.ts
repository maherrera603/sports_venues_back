import { IUser } from "@/domain/models/user";

/**
 * @file express.d.ts
 * @description
 * Extiende los tipos de Express para incluir la propiedad `user` en el objeto `Request`.
 * 
 * Esto permite que TypeScript reconozca la existencia del usuario autenticado
 * (por ejemplo, tras pasar por un middleware de autenticación),
 * evitando errores de tipo y mejorando la autocompletación.
 * 
 * Debe colocarse en una carpeta de tipos globales, por ejemplo:
 * `src/types/express.d.ts`
 * 
 * Además, asegúrate de que esté referenciado en tu archivo `tsconfig.json`:
 * ```json
 * {
 *   "compilerOptions": {
 *     "typeRoots": ["./node_modules/@types", "./src/types"]
 *   }
 * }
 * ```
 */
declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
