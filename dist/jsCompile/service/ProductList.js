import { ProductList } from "../Model/ProductList";
import { ApiService } from "./ApiService";
export class ProductListService extends ApiService {
    async getAll() {
        const data = await this.get("/productsList");
        return data.map((p) => new ProductList(p.id, p.name, p.image, p.description, p.categoryId));
    }
}
//# sourceMappingURL=ProductList.js.map