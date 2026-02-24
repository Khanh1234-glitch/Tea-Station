import { ApiService } from "../../service/ApiService.js";
export class UsersAdminService extends ApiService {
    async getAll() {
        return this.get("/users");
    }
    async create(data) {
        return this.post("/users", data);
    }
    async update(id, data) {
        return this.patch(`/users/${id}`, data);
    }
    async deleteUser(id) {
        return this.delete(`/users/${id}`);
    }
    async toggleStatus(id, currentStatus) {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        return this.patch(`/users/${id}`, {
            status: newStatus,
        });
    }
}
//# sourceMappingURL=UsersAdminService.js.map