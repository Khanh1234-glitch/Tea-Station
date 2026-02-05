import { ProductList, Size, Variants } from "./ProductList.js";
export declare class CartItem {
    product: ProductList;
    size: Size | null;
    variant: Variants | null;
    quantity: number;
    constructor(product: ProductList, size: Size | null, variant: Variants | null, quantity: number);
    getTotal(): number;
    getSize(): string;
    static isTheSame(a: CartItem, b: CartItem): boolean;
}
//# sourceMappingURL=CartItem.d.ts.map