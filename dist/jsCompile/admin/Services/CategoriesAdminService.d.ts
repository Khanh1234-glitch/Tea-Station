import { ApiService } from "../../service/ApiService.js";
import type { CategoryAdmin } from "../Model/CategoriesAdmin.js";
export declare class CategoriesAdminService extends ApiService {
    getAll(): Promise<CategoryAdmin[]>;
    create(data: {
        name: string;
        slug: string;
    }): Promise<unknown>;
    update(id: string, data: Partial<CategoryAdmin>): Promise<unknown>;
    deleteCate(id: string): Promise<void>;
    updateStatus(id: string, status: string): Promise<unknown>;
}
//# sourceMappingURL=CategoriesAdminService.d.ts.map