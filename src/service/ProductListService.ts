import { ApiService } from "./ApiService.js";
import { BrewGuide, ProductList, ProductSize } from "../Model/ProductList.js";
import { ProductVariant } from "../Model/ProductVariant.js";

export class ProductListService extends ApiService {
    async getAll(): Promise<ProductList[]> {
        const data = await this.get<ProductList[]>("/productsList");

        return data.map(
            (p) =>
                new ProductList(
                    p.id,
                    p.name,
                    p.image,
                    p.description,
                    p.categoryId,
                    p.slug,
                    p.images,
                    p.basePrice,
                    p.unit,
                    p.sizes.map((s: ProductSize) => new ProductSize(s.id, s.label, s.price)),
                    p.variants.map((v: ProductVariant) => new ProductVariant(v.id, v.product_id, v.size, v.extra_price, v.price, v.stock, "active")),
                    p.origin,
                    new BrewGuide(p.brewGuide.tea, p.brewGuide.water, p.brewGuide.temperature),
                    p.expiry,
                    p.storage,
                    p.stock,
                    p.status,
                ),
        );
    }
}
