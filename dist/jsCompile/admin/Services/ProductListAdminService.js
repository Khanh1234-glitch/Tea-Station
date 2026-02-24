// admin/Services/ProductListAdminService.ts
import { ApiService } from "../../service/ApiService.js";
export class ProductListAdminService extends ApiService {
    async getAll() {
        return this.get("/productsList");
    }
    async create(data) {
        return this.post("/productsList", data);
    }
    async update(id, data) {
        return this.patch(`/productsList/${id}`, data);
    }
    async delete(id) {
        return super.delete(`/productsList/${id}`);
    }
}
//# sourceMappingURL=ProductListAdminService.js.map