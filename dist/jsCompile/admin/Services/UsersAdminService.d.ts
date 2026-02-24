import type { User } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";
export declare class UsersAdminService extends ApiService {
    getAll(): Promise<User[]>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    toggleStatus(id: string, currentStatus: string): Promise<User>;
}
//# sourceMappingURL=UsersAdminService.d.ts.map