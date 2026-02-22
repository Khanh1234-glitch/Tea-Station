import type { CartItem } from "../Model/CartItem.js";

export class CartService {
    private storageKey = "tea_station_cart";

    getCart(): CartItem[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private save(cart: CartItem[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    add(item: CartItem) {
        const cart = this.getCart();

        const existing = cart.find((i) => i.product_id === item.product_id && i.size === item.size && i.variant === item.variant);

        if (existing) {
            existing.quantity += item.quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
    remove(product_id: string, size: string, variant: string) {
        const cart = this.getCart();

        const newCart = cart.filter((i) => !(i.product_id === product_id && i.size === size && i.variant === variant));

        this.save(newCart);
    }

    update(product_id: string, size: string, variant: string, quantity: number) {
        const cart = this.getCart();

        const item = cart.find((i) => i.product_id === product_id && i.size === size && i.variant === variant);

        if (item) {
            item.quantity = quantity;
        }

        this.save(cart);
    }

    getTotal(): number {
        return this.getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
    }
}
