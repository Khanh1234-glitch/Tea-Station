import { ApiService } from "../../service/ApiService.js";
export class ProductAttributeAdminService extends ApiService {
    async getAll() {
        return this.get("/product_attributes");
    }
    async create(data) {
        return this.post("/product_attributes", data);
    }
    async update(id, data) {
        return this.patch(`/product_attributes/${id}`, data);
    }
    async delete(id) {
        return super.delete(`/product_attributes/${id}`);
    }
}
//# sourceMappingURL=ProductAttributeAdminService.js.map