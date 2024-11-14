import { User } from "../lib/models/User";  

declare global {
    namespace Express {
        interface Request {
            user?: User | string;  // Assuming user can be a User object or just a string userId
        }
    }
}