import { ApiService } from "../../service/ApiService.js";
import type { ProductAdmin } from "../Model/ProductAdmin.js";
export declare class ProductAdminService extends ApiService {
    getAll(): Promise<ProductAdmin[]>;
    create(data: Omit<ProductAdmin, "id">): Promise<unknown>;
    update(id: string, data: Partial<ProductAdmin>): Promise<unknown>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductAdminService.d.ts.map