import { CartItem } from "../Model/CartItem.js";
import { Size, Variants } from "../Model/ProductList.js";
export class CartService {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }
    getItem() {
        return this.items;
    }
    static getInstance() {
        if (!CartService.Instance) {
            CartService.Instance = new CartService();
        }
        return CartService.Instance;
    }
    addItem(newItem) {
        const quantityInput = document.querySelector("#quantity");
        const quantity = Number((quantityInput === null || quantityInput === void 0 ? void 0 : quantityInput.value) || 1);
        let cart = [];
        let found = false;
        for (const cartItem of cart) {
            if (CartItem.isTheSame(cartItem, newItem)) {
                cartItem.quantity += quantity;
                found = true;
                break;
            }
        }
        if (!found) {
            newItem.quantity = quantity;
            cart.push(newItem);
        }
        this.saveToStorage();
    }
    removeItem(id) {
        this.items = this.items.filter((item) => item.product.id != id);
        this.saveToStorage();
    }
    updateItemQuantity(id, quantity) {
        if (quantity <= 0) {
            // this.removeItem(id);
        }
        else {
            this.items.find((item) => item.product.id == id).quantity = quantity;
        }
        this.saveToStorage();
    }
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }
    saveToStorage() {
        localStorage.setItem("cart-tea", JSON.stringify(this.items));
    }
    loadFromStorage() {
        const data = localStorage.getItem("cart-tea");
        if (!data)
            return;
        const rawItems = JSON.parse(data);
        this.items = rawItems.map((item) => {
            return new CartItem(item.product, 
            // 👇 MAP TỪ sizes → size
            item.size ? item.size : item.sizes ? item.sizes : null, 
            // 👇 MAP TỪ variants → variant
            item.variant ? item.variant : item.variants ? item.variants : null, Number(item.quantity) || 1);
        });
    }
}
//# sourceMappingURL=CartService.js.map