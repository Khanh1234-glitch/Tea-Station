import { ApiService } from "./ApiService.js";
import { BrewGuide, ProductList, ProductSize, ProductVariant } from "../Model/ProductList.js";

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
                    p.sizes.map((s: any) => new ProductSize(s.id, s.label, s.price)),
                    p.variants.map((v: any) => new ProductVariant(v.id, v.label)),
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
