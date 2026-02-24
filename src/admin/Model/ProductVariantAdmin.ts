export class ProductVariantAdmin {
    id: string;
    product_id: string;
    size: string;
    extra_price: number;
    price: number;
    stock: number;
    status?: "active" | "inactive";
    constructor(id: string, product_id: string, size: string, extra_price: number, price: number, stock: number, status?: "active") {
        this.id = id;
        this.product_id = product_id;
        this.size = size;
        this.extra_price = extra_price;
        this.price = price;
        this.stock = stock;
        this.status = status!;
    }
}
