import { DashboardService } from "../Services/DashboardAdminService.js";
export class DashboardController {
    constructor() {
        this.service = new DashboardService();
    }
    async init() {
        await this.renderStats();
    }
    async renderStats() {
        const products = await this.service.getProducts();
        const users = await this.service.getUsers();
        const orders = await this.service.getOrders();
        const activeProducts = products.filter((p) => p.status === "active");
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        document.querySelector("#stat-products").textContent = activeProducts.length.toString();
        document.querySelector("#stat-users").textContent = users.length.toString();
        document.querySelector("#stat-orders").textContent = orders.length.toString();
        document.querySelector("#stat-revenue").textContent = totalRevenue.toLocaleString("vi-VN") + "đ";
    }
}
//# sourceMappingURL=DashboardController.js.map