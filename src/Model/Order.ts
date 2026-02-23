export class Order {
    id?: string;
    user_id: string;
    customer_name: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    payment_method: string;
    status: string;
    total: number;
    shipping_fee: number;
    created_at: string;

    constructor(
        user_id: string,
        customer_name: string,
        phone: string,
        email: string,
        address: string,
        note: string,
        payment_method: string,
        total: number,
    ) {
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
