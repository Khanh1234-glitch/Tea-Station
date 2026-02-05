import { CartItem } from "../Model/CartItem.js";
import { ProductList, Size, Variants } from "../Model/ProductList.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
export class ProductDetailController {
    constructor() {
        this.DetailView = new ProductDetailViews();
        this.productDetailService = new ProductListService();
        this.productDetail = null;
        this.total = null;
        this.selectedSize = null;
        this.selectedVariant = null;
    }
    async init() {
        const URLParams = new URLSearchParams(window.location.search);
        const productId = URLParams.get("id");
        if (!productId) {
            alert("Khong tim thay san pham");
            window.location.href = "/Views/products.html";
            return;
        }
        this.productDetail = await this.productDetailService.getById(productId);
        this.renderProductDetail();
        this.addEvents();
    }
    renderProductDetail() {
        if (!this.productDetail) {
            alert("Không tìm thấy sản phẩm");
            return;
        }
        document.querySelector("#productDetail").innerHTML = this.DetailView.renderProductDetail(this.productDetail);
    }
    addEvents() {
        var _a, _b, _c;
        const sizeRadios = document.querySelectorAll('input[type="radio"][name="size"]');
        const variantRadios = document.querySelectorAll(`input[type="radio"][name="variant"]`);
        const basePrice = (_b = (_a = this.productDetail) === null || _a === void 0 ? void 0 : _a.basePrice) !== null && _b !== void 0 ? _b : 0;
        variantRadios.forEach((v) => {
            var _a;
            v.addEventListener("change", (e) => {
                var _a;
                const input = e.currentTarget;
                if (!input.checked)
                    return;
                const id = input.dataset.id;
                const name = input.dataset.name;
                this.selectedVariant = new Variants(id, name);
                // remove highlight all
                variantRadios.forEach((r) => {
                    var _a;
                    (_a = r.closest("label")) === null || _a === void 0 ? void 0 : _a.classList.remove("ring-p-900", "ring-2");
                });
                // add highlight current
                (_a = input.closest("label")) === null || _a === void 0 ? void 0 : _a.classList.add("ring-p-900", "ring-2");
                console.log("SELECTED VARIANT:", this.selectedVariant);
            });
            // init highlight (radio checked sẵn)
            if (v.checked) {
                (_a = v.closest("label")) === null || _a === void 0 ? void 0 : _a.classList.add("ring-p-900", "ring-2");
            }
        });
        sizeRadios.forEach((rd) => {
            rd.addEventListener("change", (e) => {
                var _a;
                const input = e.currentTarget;
                if (!input.checked)
                    return;
                const id = input.dataset.id;
                const name = input.dataset.name;
                const price = Number(input.dataset.price || 0);
                this.selectedSize = new Size(id, name, price);
                sizeRadios.forEach((r) => {
                    var _a;
                    (_a = r.closest("label")) === null || _a === void 0 ? void 0 : _a.classList.remove("ring-p-900", "ring-2");
                });
                // 2. Thêm highlight cho label đang check
                if (rd.checked) {
                    (_a = rd.closest("label")) === null || _a === void 0 ? void 0 : _a.classList.add("ring-p-900", "ring-2");
                }
                this.total = basePrice + price;
                console.log("TOTAL:", this.total);
                console.log("SELECTED SIZE:", this.selectedSize);
                document.querySelector("#product-price").innerHTML = this.total.toLocaleString("vi-VN");
            });
        });
        (_c = document.querySelector("#addToCart")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
            this.addToCart();
        });
    }
    addToCart() {
        const quantityInput = document.querySelector("#quantity");
        const quantity = Number((quantityInput === null || quantityInput === void 0 ? void 0 : quantityInput.value) || 1);
        if (!this.productDetail || !this.selectedSize || !this.selectedVariant) {
            alert("Vui lòng chọn kích cỡ và biến thể");
            return;
        }
        let cart = [];
        if (localStorage.getItem("cart-tea")) {
            cart = JSON.parse(localStorage.getItem("cart-tea") || "[]");
        }
        if (!this.selectedVariant)
            return;
        const newItem = new CartItem(this.productDetail, this.selectedSize, this.selectedVariant, quantity);
        let found = false;
        for (const item of cart) {
            if (CartItem.isTheSame(newItem, item)) {
                item.quantity += quantity;
                found = true;
                break;
            }
        }
        if (!found) {
            cart.push(newItem);
        }
        localStorage.setItem("cart-tea", JSON.stringify(cart));
        console.log("CART:", cart);
    }
}
//# sourceMappingURL=ProductDetailController.js.map