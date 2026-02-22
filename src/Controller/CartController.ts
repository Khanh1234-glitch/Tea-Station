import type { Product } from "../Model/Product.js";
import { CartService } from "../service/CartService.js";
import { ProductListService } from "../service/ProductListService.js";
import { CartView } from "../Views/CartView.js";

export class CartController {
    private cartService = new CartService();
    private view = new CartView();
    private productListService = new ProductListService();

    public async init() {
        await this.render();
    }

    private async render() {
        const cart = this.cartService.getCart();
        const productList = await this.productListService.getAll();
        const container = document.querySelector("#cart-items");
        const summary = document.querySelector("#cart-summary");

        if (!container || !summary) return;

        // 🔥 phải await

        container.innerHTML = this.view.renderItems(cart, productList);
        summary.innerHTML = this.view.renderSummary(cart);

        this.initEvents();
    }

    private initEvents() {
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const el = e.currentTarget as HTMLElement;

                const id = el.dataset.id!;
                const size = el.dataset.size!;
                const variant = el.dataset.variant!;

                this.cartService.remove(id, size, variant);

                this.render();
            });
        });

        document.querySelectorAll(".quantity-input").forEach((input) => {
            input.addEventListener("change", (e) => {
                document.querySelectorAll(".quantity-input").forEach((input) => {
                    input.addEventListener("change", (e) => {
                        const el = e.currentTarget as HTMLInputElement;

                        const id = el.dataset.id!;
                        const size = el.dataset.size!;
                        const variant = el.dataset.variant!;
                        const quantity = Number(el.value);

                        this.cartService.update(id, size, variant, quantity);

                        this.render();
                    });
                });
            });
        });
    }
}
