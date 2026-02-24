import { ApiService } from "../../service/ApiService.js";
import type { ProductAttributeAdmin } from "../Model/ProductAttributeAdmin.js";

export class ProductAttributeAdminService extends ApiService {
    async getAll() {
        return this.get<ProductAttributeAdmin[]>("/product_attributes");
    }

    async create(data: Omit<ProductAttributeAdmin, "id">) {
        return this.post("/product_attributes", data);
    }

    async update(id: string, data: Partial<ProductAttributeAdmin>) {
        return this.patch(`/product_attributes/${id}`, data);
    }

    async delete(id: string) {
        return super.delete(`/product_attributes/${id}`);
    }
}
