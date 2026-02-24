import { ApiService } from "../../service/ApiService.js";
export class RolesAdminService extends ApiService {
    getAll() {
        return this.get("/roles");
    }
    create(data) {
        return this.post("/roles", data);
    }
    update(id, data) {
        return this.patch(`/roles/${id}`, data);
    }
    deleteRole(id) {
        return this.delete(`/roles/${id}`);
    }
}
//# sourceMappingURL=RolesAdminService.js.map