import { AppServer, AppRoutes } from "@/presentation";
import { EnvsAdapter } from "@/plugins";


( async () => {
    main();
})()


async function main() {
    
    const server = new AppServer({ port: EnvsAdapter.PORT, routes: AppRoutes.routes });
    server.start();
}