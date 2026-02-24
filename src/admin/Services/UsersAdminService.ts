import type { User } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";

export class UsersAdminService extends ApiService {
    public async getAll(): Promise<User[]> {
        return this.get<User[]>("/users");
    }

    public async create(data: Partial<User>): Promise<User> {
        return this.post<User>("/users", data);
    }

    public async update(id: string, data: Partial<User>): Promise<User> {
        return this.patch<User>(`/users/${id}`, data);
    }

    async deleteUser(id: string): Promise<void> {
        return this.delete(`/users/${id}`);
    }
    public async toggleStatus(id: string, currentStatus: string) {
        const newStatus = currentStatus === "active" ? "inactive" : "active";

        return this.patch<User>(`/users/${id}`, {
            status: newStatus,
        });
    }
}
