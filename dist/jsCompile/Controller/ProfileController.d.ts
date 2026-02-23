import type { Order } from "../Model/Order.js";
import type { User } from "../Model/User.js";
export declare class ProfileController {
    private view;
    private userService;
    private orderService;
    init(): Promise<void>;
    renderView(user: User, orderCount: number, orders: Order[]): void;
    private bindUpdate;
    private bindChangePassword;
}
//# sourceMappingURL=ProfileController.d.ts.map