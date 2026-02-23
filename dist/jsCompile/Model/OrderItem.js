export class OrderItem {
    constructor(order_id, product_id, variant_id, price, quantity) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.variant_id = variant_id;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}
//# sourceMappingURL=OrderItem.js.map