import { CartService } from "../service/CartService.js";
import { ProductListService } from "../service/ProductListService.js";
import { CartView } from "../Views/CartView.js";
export class CartController {
    constructor() {
        this.cartService = new CartService();
        this.view = new CartView();
        this.productListService = new ProductListService();
    }
    async init() {
        await this.render();
    }
    async render() {
        const cart = this.cartService.getCart();
        const productList = await this.productListService.getAll();
        const container = document.querySelector("#cart-items");
        const summary = document.querySelector("#cart-summary");
        if (!container || !summary)
            return;
        // 🔥 phải await
        container.innerHTML = this.view.renderItems(cart, productList);
        summary.innerHTML = this.view.renderSummary(cart);
        this.initEvents();
    }
    initEvents() {
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const el = e.currentTarget;
                const id = el.dataset.id;
                const size = el.dataset.size;
                const variant = el.dataset.variant;
                this.cartService.remove(id, size, variant);
                this.render();
            });
        });
        document.querySelectorAll(".quantity-input").forEach((input) => {
            input.addEventListener("change", (e) => {
                document.querySelectorAll(".quantity-input").forEach((input) => {
                    input.addEventListener("change", (e) => {
                        const el = e.currentTarget;
                        const id = el.dataset.id;
                        const size = el.dataset.size;
                        const variant = el.dataset.variant;
                        const quantity = Number(el.value);
                        this.cartService.update(id, size, variant, quantity);
                        this.render();
                    });
                });
            });
        });
    }
}
//# sourceMappingURL=CartController.js.map