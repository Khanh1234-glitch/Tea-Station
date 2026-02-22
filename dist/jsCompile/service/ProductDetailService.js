import { ApiService } from "./ApiService.js";
import { BrewGuide, ProductList, ProductSize } from "../Model/ProductList.js";
export class ProductDetailService extends ApiService {
    async getById(id) {
        var _a;
        const data = await this.get(`/productsList/${id}`);
        return new ProductList(data.id, data.name, data.image, data.description, data.categoryId, data.slug, data.images, data.basePrice, data.unit, ((_a = data.sizes) !== null && _a !== void 0 ? _a : []).map((s) => new ProductSize(s.id, s.label, s.price)), data.variants, data.origin, new BrewGuide(data.brewGuide.tea, data.brewGuide.water, data.brewGuide.temperature), data.expiry, data.storage, data.stock, data.status);
    }
}
//# sourceMappingURL=ProductDetailService.js.map