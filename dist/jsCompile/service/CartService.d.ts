import { CartItem } from "../Model/CartItem.js";
export declare class CartService {
    private static Instance;
    items: CartItem[];
    constructor();
    getItem(): CartItem[];
    static getInstance(): CartService;
    addItem(newItem: CartItem): void;
    removeItem(id: string): void;
    updateItemQuantity(id: string, quantity: number): void;
    getTotalPrice(): number;
    clearCart(): void;
    private saveToStorage;
    private loadFromStorage;
}
//# sourceMappingURL=CartService.d.ts.map