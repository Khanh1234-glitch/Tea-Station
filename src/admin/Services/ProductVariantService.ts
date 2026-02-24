import { ApiService } from "../../service/ApiService.js";
import type { ProductVariantAdmin } from "../Model/ProductVariantAdmin.js";

export class ProductVariantAdminService extends ApiService {
    async getAll() {
        return this.get<ProductVariantAdmin[]>("/product_variants");
    }

    async create(data: Omit<ProductVariantAdmin, "id">) {
        return this.post("/product_variants", data);
    }

    async update(id: string, data: Partial<ProductVariantAdmin>) {
        return this.patch(`/product_variants/${id}`, data);
    }

    async delete(id: string) {
        return super.delete(`/product_variants/${id}`);
    }
}
