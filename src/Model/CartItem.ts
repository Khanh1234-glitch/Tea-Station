export class CartItem {
    product_id: string;
    variant_id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    variant: string;
    constructor(product_id: string, variant_id: string, name: string, price: number, image: string, quantity: number, size: string, variant: string) {
        this.product_id = product_id;
        this.variant_id = variant_id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.size = size;
        this.variant = variant;
    }

    get total(): number {
        return this.price * this.quantity;
    }
}
