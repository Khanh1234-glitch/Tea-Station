import { CartService } from "../service/CartService.js";
import { CartView } from "../Views/CartViews.js";
export class CartController {
    constructor() {
        this.cartService = CartService.getInstance();
        this.view = new CartView();
    }
    init() {
        this.render();
    }
    render() {
        const items = this.cartService.getItem();
        const total = this.cartService.getTotalPrice();
        const containerCart = document.querySelector("#cart");
        const cartLeft = document.querySelector("#cartRight");
        cartLeft.innerHTML = this.view.renderCartRight(total);
        if (containerCart) {
            containerCart.innerHTML = this.view.render(items);
        }
    }
}
//# sourceMappingURL=CartController.js.map