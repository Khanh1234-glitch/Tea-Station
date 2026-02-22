import { CartItem } from "../Model/CartItem.js";
<<<<<<< HEAD
import { Size, Variants } from "../Model/ProductList.js";

export class CartService {
    private static Instance: CartService;
    items: CartItem[] = [];
    constructor() {
        this.loadFromStorage();
    }
    getItem(): CartItem[] {
        return this.items;
    }
    static getInstance(): CartService {
        if (!CartService.Instance) {
            CartService.Instance = new CartService();
        }
        return CartService.Instance;
    }
    addItem(newItem: CartItem): void {
        const quantityInput = document.querySelector<HTMLInputElement>("#quantity");
        const quantity = Number(quantityInput?.value || 1);

        let cart: CartItem[] = [];

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
    removeItem(id: string): void {
        this.items = this.items.filter((item: CartItem) => item.product.id != id);
        this.saveToStorage();
    }
    updateItemQuantity(id: string, quantity: number): void {
        if (quantity <= 0) {
            // this.removeItem(id);
        } else {
            this.items.find((item: CartItem) => item.product.id == id)!.quantity = quantity;
        }
        this.saveToStorage();
    }
    getTotalPrice() {
        return this.items.reduce((sum: number, item: CartItem) => sum + item.getTotal(), 0);
    }
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }
    private saveToStorage() {
        localStorage.setItem("cart-tea", JSON.stringify(this.items));
    }
    private loadFromStorage() {
        const data = localStorage.getItem("cart-tea");
        if (!data) return;

        const rawItems = JSON.parse(data);

        this.items = rawItems.map((item: any) => {
            return new CartItem(
                item.product,
                // 👇 MAP TỪ sizes → size
                item.size ? item.size : item.sizes ? item.sizes : null,

                // 👇 MAP TỪ variants → variant
                item.variant ? item.variant : item.variants ? item.variants : null,

                Number(item.quantity) || 1,
            );
        });
=======

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
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
