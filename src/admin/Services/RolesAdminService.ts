import type { UserRole } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";

export class RolesAdminService extends ApiService {
    getAll(): Promise<UserRole[]> {
        return this.get<UserRole[]>("/roles");
    }

    create(data: Partial<UserRole>) {
        return this.post<UserRole>("/roles", data);
    }

    update(id: string, data: Partial<UserRole>) {
        return this.patch<UserRole>(`/roles/${id}`, data);
    }
    deleteRole(id: string) {
        return this.delete(`/roles/${id}`);
    }
}
