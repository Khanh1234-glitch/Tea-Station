import { CartItem } from "../Model/CartItem.js";
export class CartService {
    constructor() {
        this.storageKey = "tea_station_cart";
    }
    getCart() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
    save(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
    add(item) {
        const cart = this.getCart();
        const existing = cart.find((i) => i.product_id === item.product_id && i.size === item.size && i.variant === item.variant);
        if (existing) {
            existing.quantity += item.quantity;
        }
        else {
            cart.push(item);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
    remove(product_id, size, variant) {
        const cart = this.getCart();
        const newCart = cart.filter((i) => !(i.product_id === product_id && i.size === size && i.variant === variant));
        this.save(newCart);
    }
    update(product_id, size, variant, quantity) {
        const cart = this.getCart();
        const item = cart.find((i) => i.product_id === product_id && i.size === size && i.variant === variant);
        if (item) {
            item.quantity = quantity;
        }
        this.save(cart);
    }
    getTotal() {
        return this.getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
    }
    clear() {
        localStorage.removeItem(this.storageKey);
    }
}
//# sourceMappingURL=CartService.js.map