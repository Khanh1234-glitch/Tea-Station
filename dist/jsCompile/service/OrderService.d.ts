import type { Order } from "../Model/Order.js";
import type { OrderItem } from "../Model/OrderItem.js";
import { ApiService } from "./ApiService.js";
export declare class OrderService extends ApiService {
    createOrder(order: Order): Promise<unknown>;
    createOrderItem(data: OrderItem): Promise<unknown>;
    getOrdersByUser(userId: string): Promise<Order[]>;
}
//# sourceMappingURL=OrderService.d.ts.map