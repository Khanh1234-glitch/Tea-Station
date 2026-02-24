import { ApiService } from "../../service/ApiService.js";
import type { ProductAttributeAdmin } from "../Model/ProductAttributeAdmin.js";
export declare class ProductAttributeAdminService extends ApiService {
    getAll(): Promise<ProductAttributeAdmin[]>;
    create(data: Omit<ProductAttributeAdmin, "id">): Promise<unknown>;
    update(id: string, data: Partial<ProductAttributeAdmin>): Promise<unknown>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductAttributeAdminService.d.ts.map