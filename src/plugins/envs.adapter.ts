import "dotenv/config";
import { get } from "env-var";


export class EnvsAdapter {

    public static get PORT(): number{
        return get('PORT').required().asPortNumber();
    }


}