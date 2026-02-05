import { ProductList, Size, Variants } from "./ProductList.js";

export class CartItem {
    product: ProductList;
    size: Size | null;
    variant: Variants | null;
    quantity: number;

    constructor(product: ProductList, size: Size | null, variant: Variants | null, quantity: number) {
        this.product = product;
        this.size = size;
        this.variant = variant;
        this.quantity = quantity;
    }

    getTotal(): number {
        return (this.product.basePrice + (this.size?.price ?? 0)) * this.quantity;
    }
    getSize(): string {
        return this.size ? this.size.label : "Không có size";
    }
    static isTheSame(a: CartItem, b: CartItem): boolean {
        return a.product.id === b.product.id && a.size?.id === b.size?.id && a.variant?.id === b.variant?.id;
    }
}
