import { BrewGuide, ProductList, Size } from "../Model/ProductList.js";
import { ApiService } from "./ApiService.js";

export class ProductListService extends ApiService {
    async getAll(): Promise<ProductList[]> {
        const data: ProductList[] = await this.get<ProductList[]>("/productsList");
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
                    (p.sizes ?? []).map((s) => new Size(s.label, s.price)),
                    p.variants,
                    p.origin,
                    new BrewGuide(p.brewGuide.tea, p.brewGuide.water, p.brewGuide.temperature),
                    p.expiry,
                    p.storage,
                    p.stock,
                    p.status,
                ),
        );
    }
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
            (data.sizes ?? []).map((s) => new Size(s.label, s.price)),
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
