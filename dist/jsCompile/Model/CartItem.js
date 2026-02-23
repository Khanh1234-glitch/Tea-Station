export class CartItem {
    constructor(product_id, variant_id, name, price, image, quantity, size, variant) {
        this.product_id = product_id;
        this.variant_id = variant_id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.size = size;
        this.variant = variant;
    }
    get total() {
        return this.price * this.quantity;
    }
}
//# sourceMappingURL=CartItem.js.map