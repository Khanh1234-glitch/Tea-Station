import { ApiService } from "./ApiService.js";
import { BrewGuide, ProductList, ProductSize } from "../Model/ProductList.js";

export class ProductDetailService extends ApiService {
    async getById(id: string): Promise<ProductList> {
        const data: ProductList = await this.get<ProductList>(`/productsList/${id}`);
        return new ProductList(
            data.id,
            data.name,
            data.image,
            data.description,
            data.categoryId,
            data.slug,
            data.images,
            data.basePrice,
            data.unit,
            (data.sizes ?? []).map((s) => new ProductSize(s.id, s.label, s.price)),
            data.variants,
            data.origin,
            new BrewGuide(data.brewGuide.tea, data.brewGuide.water, data.brewGuide.temperature),
            data.expiry,
            data.storage,
            data.stock,
            data.status,
        );
    }
}
