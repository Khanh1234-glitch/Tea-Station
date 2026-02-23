import { CartService } from "../service/CartService.js";
import { OrderService } from "../service/OrderService.js";
import { CheckoutView } from "../Views/CheckoutView.js";
import { Order } from "../Model/Order.js";
import { AddressService } from "../service/AddressService.js";
import { UserService } from "../service/UserService.js";
export class CheckoutController {
    constructor() {
        this.view = new CheckoutView();
        this.cartService = new CartService();
        this.orderService = new OrderService();
        this.addressService = new AddressService();
        this.userService = new UserService();
    }
    async init() {
        const cartItems = this.cartService.getCart();
        const total = this.cartService.getTotal();
        this.view.renderSummary(cartItems);
        this.view.updateTotal(total);
        try {
            this.city = await this.addressService.getAddress();
            this.view.renderCities(this.city);
            this.bindAddressEvents();
        }
        catch (error) {
            console.error(error);
        }
        this.view.bindPlaceOrder(() => this.handleCheckout());
    }
    // ================= ADDRESS LOGIC =================
    bindAddressEvents() {
        const citySelect = document.querySelector("#city");
        const districtSelect = document.querySelector("#district");
        const wardSelect = document.querySelector("#ward");
        // Khi chọn thành phố
        citySelect === null || citySelect === void 0 ? void 0 : citySelect.addEventListener("change", () => {
            if (!citySelect.value) {
                this.view.resetDistrict();
                this.view.resetWard();
                return;
            }
            this.view.renderDistricts(this.city.districts);
            this.view.resetWard();
        });
        // Khi chọn quận
        districtSelect === null || districtSelect === void 0 ? void 0 : districtSelect.addEventListener("change", () => {
            if (!districtSelect.value) {
                this.view.resetWard();
                return;
            }
            const district = this.city.districts.find((d) => d.code === districtSelect.value);
            if (!district)
                return;
            this.view.renderWards(district.wards);
        });
    }
    // ================= CHECKOUT =================
    async handleCheckout() {
        const cartItems = this.cartService.getCart();
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }
        const name = document.querySelector("#customerName").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const email = document.querySelector("#email").value.trim();
        const addressInput = document.querySelector("#address").value.trim();
        const districtSelect = document.querySelector("#district");
        const wardSelect = document.querySelector("#ward");
        const citySelect = document.querySelector("#city");
        const note = document.querySelector("#note").value.trim();
        const payment = document.querySelector('input[name="payment"]:checked').value;
        if (!name || !phone || !email || !addressInput || !citySelect.value || !districtSelect.value || !wardSelect.value) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        const wardText = wardSelect.selectedOptions[0].text;
        const districtText = districtSelect.selectedOptions[0].text;
        const cityText = citySelect.selectedOptions[0].text;
        const fullAddress = `${addressInput}, ${wardText}, ${districtText}, ${cityText}`;
        const total = this.cartService.getTotal();
        const currentUser = this.userService.getLoginState();
        if (!currentUser) {
            alert("Vui long dang nhap");
            return;
        }
        try {
            const order = new Order(currentUser.id, // user_id (sau này thay bằng user login)
            name, phone, email, fullAddress, note, payment, total);
            const createdOrder = await this.orderService.createOrder(order);
            for (const item of cartItems) {
                await this.orderService.createOrderItem({
                    order_id: createdOrder.id,
                    product_id: item.product_id,
                    variant_id: item.variant_id,
                    price: item.price,
                    quantity: item.quantity,
                    total: item.price * item.quantity,
                });
            }
            this.cartService.clear();
            alert("Đặt hàng thành công!");
            window.location.href = "/Views/cart.html";
        }
        catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra!");
        }
    }
}
//# sourceMappingURL=CheckoutController.js.map