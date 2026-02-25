import { Order } from "../../Model/Order.js";
import { ProductList } from "../../Model/ProductList.js";
import { User } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";
export declare class DashboardService extends ApiService {
    getProducts(): Promise<ProductList[]>;
    getUsers(): Promise<User[]>;
    getOrders(): Promise<Order[]>;
}
//# sourceMappingURL=DashboardAdminService.d.ts.map