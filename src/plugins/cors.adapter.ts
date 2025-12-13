import cors from "cors";
import {EnvsAdapter} from "./envs.adapter";

export class CorsAdapter {

    public static get config(){
        const corsOptions ={
            origin: EnvsAdapter.CORS_ORIGIN
        }

        return cors( corsOptions );
    }
}
