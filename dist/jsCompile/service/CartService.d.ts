import { CartItem } from "../Model/CartItem.js";
export declare class CartService {
    private storageKey;
    getCart(): CartItem[];
    private save;
    add(item: CartItem): void;
    remove(product_id: string, size: string, variant: string): void;
    update(product_id: string, size: string, variant: string, quantity: number): void;
    getTotal(): number;
    clear(): void;
}
//# sourceMappingURL=CartService.d.ts.map