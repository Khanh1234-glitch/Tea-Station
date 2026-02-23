import type { Order } from "../Model/Order.js";
import type { OrderItem } from "../Model/OrderItem.js";
import { ApiService } from "./ApiService.js";

export class OrderService extends ApiService {
    async createOrder(order: Order) {
        return await this.post("/orders", order);
    }

    async createOrderItem(data: OrderItem) {
        return await this.post("/order_items", data);
    }
    async getOrdersByUser(userId: string): Promise<Order[]> {
        return this.get<Order[]>(`/orders?user_id=${userId}`);
    }
}
