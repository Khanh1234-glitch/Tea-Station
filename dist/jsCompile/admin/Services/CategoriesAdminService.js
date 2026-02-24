import { ApiService } from "../../service/ApiService.js";
export class CategoriesAdminService extends ApiService {
    async getAll() {
        return this.get("/categories");
    }
    async create(data) {
        return this.post("/categories", data);
    }
    async update(id, data) {
        return this.patch(`/categories/${id}`, data);
    }
    async deleteCate(id) {
        return this.delete(`/categories/${id}`);
    }
    async updateStatus(id, status) {
        return this.patch(`/categories/${id}`, { status });
    }
}
//# sourceMappingURL=CategoriesAdminService.js.map