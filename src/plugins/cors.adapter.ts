import cors from "cors";

export class CorsAdapter {

    public static get config(){
        const corsOptions ={
            origin: "http://localhost:4200"
        }

        return cors( corsOptions );
    }
}