import { Category } from "../Model/Category.js";
import { ApiService } from "./ApiService.js";

export class CategoryService extends ApiService {
    async getAll(): Promise<Category[]> {
        const data: Category[] = await this.get<Category[]>(`/categories`);
        return data.map((c) => new Category(c.id, c.name, c.slug));
    }
}
