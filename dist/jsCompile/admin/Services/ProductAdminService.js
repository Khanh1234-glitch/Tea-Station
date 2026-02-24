import { ApiService } from "../../service/ApiService.js";
export class ProductAdminService extends ApiService {
    async getAll() {
        return this.get("/products");
    }
    async create(data) {
        return this.post("/products", data);
    }
    async update(id, data) {
        return this.patch(`/products/${id}`, data);
    }
    async delete(id) {
        return super.delete(`/products/${id}`);
    }
}
//# sourceMappingURL=ProductAdminService.js.map