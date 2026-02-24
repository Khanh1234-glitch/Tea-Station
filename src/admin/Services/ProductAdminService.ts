import { ApiService } from "../../service/ApiService.js";
import type { ProductAdmin } from "../Model/ProductAdmin.js";

export class ProductAdminService extends ApiService {
    async getAll() {
        return this.get<ProductAdmin[]>("/products");
    }

    async create(data: Omit<ProductAdmin, "id">) {
        return this.post("/products", data);
    }

    async update(id: string, data: Partial<ProductAdmin>) {
        return this.patch(`/products/${id}`, data);
    }

    async delete(id: string) {
        return super.delete(`/products/${id}`);
    }
}
