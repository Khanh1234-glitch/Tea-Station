import { Category } from "../Model/Category.js";
import { ApiService } from "./ApiService.js";
export class CategoryService extends ApiService {
    async getAll() {
        const data = await this.get(`/categories`);
        return data.map((c) => new Category(c.id, c.name, c.slug));
    }
}
//# sourceMappingURL=CategoryService.js.map