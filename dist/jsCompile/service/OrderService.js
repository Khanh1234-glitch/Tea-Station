import { ApiService } from "./ApiService.js";
export class OrderService extends ApiService {
    async createOrder(order) {
        return await this.post("/orders", order);
    }
    async createOrderItem(data) {
        return await this.post("/order_items", data);
    }
    async getOrdersByUser(userId) {
        return this.get(`/orders?user_id=${userId}`);
    }
}
//# sourceMappingURL=OrderService.js.map