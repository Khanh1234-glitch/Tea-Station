import { ApiService } from "../../service/ApiService.js";
import type { CategoryAdmin } from "../Model/CategoriesAdmin.js";

export class CategoriesAdminService extends ApiService {
    async getAll() {
        return this.get<CategoryAdmin[]>("/categories");
    }

    async create(data: { name: string; slug: string }) {
        return this.post("/categories", data);
    }

    async update(id: string, data: Partial<CategoryAdmin>) {
        return this.patch(`/categories/${id}`, data);
    }

    async deleteCate(id: string) {
        return this.delete(`/categories/${id}`);
    }

    async updateStatus(id: string, status: string) {
        return this.patch(`/categories/${id}`, { status });
    }
}
