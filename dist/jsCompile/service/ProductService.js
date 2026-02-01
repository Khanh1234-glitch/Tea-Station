import { Product } from "../Model/Product.js";
import { ApiService } from "./ApiService.js";
export class ProductService extends ApiService {
    async getAll() {
        const data = await this.get(`/products`);
        return data.map((p) => new Product(p.id, p.category_id, p.name, p.slug, p.short_desc, p.description, p.base_price, p.feature, p.idName, p.image));
    }
}
//# sourceMappingURL=ProductService.js.map