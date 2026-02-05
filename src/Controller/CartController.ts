import type { CartItem } from "../Model/CartItem.js";
import { CartService } from "../service/CartService.js";
import { CartView } from "../Views/CartViews.js";

export class CartController {
    private cartService = CartService.getInstance();
    private view = new CartView();
    init() {
        this.render();
    }
    private render(): void {
        const items: CartItem[] = this.cartService.getItem();
        const total: number = this.cartService.getTotalPrice();
        const containerCart: Element | null = document.querySelector("#cart");
        const cartLeft: Element | null = document.querySelector("#cartRight");
        cartLeft!.innerHTML = this.view.renderCartRight(total);
        if (containerCart) {
            containerCart.innerHTML = this.view.render(items);
        }
    }
}
