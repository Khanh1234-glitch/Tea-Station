import { Order } from "../../Model/Order.js";
import { ProductList } from "../../Model/ProductList.js";
import { User } from "../../Model/User.js";
import { ApiService } from "../../service/ApiService.js";
export class DashboardService extends ApiService {
    async getProducts() {
        return await this.get(`/productsList`);
    }
    async getUsers() {
        return await this.get("/users");
    }
    async getOrders() {
        return await this.get(`/orders`);
    }
}
//# sourceMappingURL=DashboardAdminService.js.map