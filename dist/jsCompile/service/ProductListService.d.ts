import { ProductList } from "../Model/ProductList.js";
import { ApiService } from "./ApiService.js";
export declare class ProductListService extends ApiService {
    getAll(): Promise<ProductList[]>;
    getById(id: string): Promise<ProductList>;
}
//# sourceMappingURL=ProductListService.d.ts.map