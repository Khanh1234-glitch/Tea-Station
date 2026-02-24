import { ApiService } from "../../service/ApiService.js";
export class ProductVariantAdminService extends ApiService {
    async getAll() {
        return this.get("/product_variants");
    }
    async create(data) {
        return this.post("/product_variants", data);
    }
    async update(id, data) {
        return this.patch(`/product_variants/${id}`, data);
    }
    async delete(id) {
        return super.delete(`/product_variants/${id}`);
    }
}
//# sourceMappingURL=ProductVariantService.js.map