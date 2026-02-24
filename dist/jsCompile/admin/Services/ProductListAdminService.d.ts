import { ApiService } from "../../service/ApiService.js";
import type { ProductList } from "../../Model/ProductList.js";
export declare class ProductListAdminService extends ApiService {
    getAll(): Promise<ProductList[]>;
    create(data: Omit<ProductList, "id">): Promise<unknown>;
    update(id: string, data: Partial<ProductList>): Promise<unknown>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductListAdminService.d.ts.map