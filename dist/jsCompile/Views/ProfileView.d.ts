import type { Order } from "../Model/Order.js";
import { User } from "../Model/User.js";
export declare class ProfileView {
    renderAvatar(user: User, orderCount: number): string;
    renderOrderHistory(orders: Order[]): string;
    renderInfo(user: User): string;
    renderChangePassword(): string;
}
//# sourceMappingURL=ProfileView.d.ts.map