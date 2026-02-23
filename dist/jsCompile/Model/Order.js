export class Order {
    constructor(user_id, customer_name, phone, email, address, note, payment_method, total) {
        this.user_id = user_id;
        this.customer_name = customer_name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.note = note;
        this.payment_method = payment_method;
        this.status = "pending";
        this.total = total;
        this.shipping_fee = 0;
        this.created_at = new Date().toISOString().substring(0, 10);
    }
}
//# sourceMappingURL=Order.js.map