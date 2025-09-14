import express, { Router }  from "express";
 
interface IOptions {
    port: number;
    routes: Router;
}


export class AppServer {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private routes: Router;

    constructor( { port, routes }: IOptions ){
        this.port = port;
        this.routes = routes;
    }


    public async start(){
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }));
        this.app.use( this.routes );

        this.serverListener = this.app.listen( this.port, () => console.log(`Server running on port ${this.port}`));
    }


}