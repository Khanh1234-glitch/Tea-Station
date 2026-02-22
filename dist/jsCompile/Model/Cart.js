export class CartItem {
    constructor(product_id, name, price, image, quantity = 1) {
        this.product_id = product_id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }
    get total() {
        return this.price * this.quantity;
    }
}
//# sourceMappingURL=Cart.js.map