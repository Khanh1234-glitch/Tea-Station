import { ApiService } from "../../service/ApiService.js";
import type { ProductVariantAdmin } from "../Model/ProductVariantAdmin.js";
export declare class ProductVariantAdminService extends ApiService {
    getAll(): Promise<ProductVariantAdmin[]>;
    create(data: Omit<ProductVariantAdmin, "id">): Promise<unknown>;
    update(id: string, data: Partial<ProductVariantAdmin>): Promise<unknown>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductVariantService.d.ts.map