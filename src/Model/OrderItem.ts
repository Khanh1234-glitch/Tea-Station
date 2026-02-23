export class OrderItem {
    id?: string;
    order_id: string;
    product_id: string;
    variant_id: string;
    price: number;
    quantity: number;
    total: number;

    constructor(order_id: string, product_id: string, variant_id: string, price: number, quantity: number) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.variant_id = variant_id;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}
