import { IUser } from "@/domain/models/user";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
