// admin/Services/ProductListAdminService.ts
import { ApiService } from "../../service/ApiService.js";
import type { ProductList } from "../../Model/ProductList.js";

export class ProductListAdminService extends ApiService {
    async getAll() {
        return this.get<ProductList[]>("/productsList");
    }

    async create(data: Omit<ProductList, "id">) {
        return this.post("/productsList", data);
    }

    async update(id: string, data: Partial<ProductList>) {
        return this.patch(`/productsList/${id}`, data);
    }

    async delete(id: string) {
        return super.delete(`/productsList/${id}`);
    }
}
