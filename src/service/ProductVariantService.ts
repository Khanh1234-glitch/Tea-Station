import type { ProductVariant } from "../Model/ProductVariant.js";
import { ApiService } from "./ApiService.js";

export class ProductVariantService extends ApiService {
    async getAll() {
        return this.get<ProductVariant[]>("/product_variants");
    }

    async create(data: Omit<ProductVariant, "id">) {
        return this.post("/product_variants", data);
    }

    async update(id: string, data: Partial<ProductVariant>) {
        return this.patch(`/product_variants/${id}`, data);
    }

    async delete(id: string) {
        return super.delete(`/product_variants/${id}`);
    }
}
