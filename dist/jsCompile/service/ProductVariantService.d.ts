import type { ProductVariant } from "../Model/ProductVariant.js";
import { ApiService } from "./ApiService.js";
export declare class ProductVariantService extends ApiService {
    getAll(): Promise<ProductVariant[]>;
    create(data: Omit<ProductVariant, "id">): Promise<unknown>;
    update(id: string, data: Partial<ProductVariant>): Promise<unknown>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductVariantService.d.ts.map