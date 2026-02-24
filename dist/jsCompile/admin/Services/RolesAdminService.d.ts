import type { UserRole } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";
export declare class RolesAdminService extends ApiService {
    getAll(): Promise<UserRole[]>;
    create(data: Partial<UserRole>): Promise<UserRole>;
    update(id: string, data: Partial<UserRole>): Promise<UserRole>;
    deleteRole(id: string): Promise<void>;
}
//# sourceMappingURL=RolesAdminService.d.ts.map