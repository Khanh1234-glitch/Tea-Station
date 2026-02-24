import { CartItem } from "../Model/CartItem.js";
import { ProductDetailService } from "../service/ProductDetailService.js";
import { ProductVariantService } from "../service/ProductVariantService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
import { CartService } from "../service/CartService.js";
export class ProductDetailController {
    constructor() {
        this.productService = new ProductDetailService();
        this.variantService = new ProductVariantService();
        this.view = new ProductDetailViews();
        this.cartService = new CartService();
        this.currentVariants = [];
    }
    async init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id)
            return;
        try {
            // 🔥 Lấy product từ productsList
            const product = await this.productService.getById(id);
            // 🔥 Lấy tất cả variants
            const allVariants = await this.variantService.getAll();
            // 🔥 LỌC đúng variant của product này + active
            const variantsOfProduct = allVariants.filter((v) => { var _a; return String(v.product_id).trim() === String(product.id).trim() && ((_a = v.status) !== null && _a !== void 0 ? _a : "active") === "active"; });
            this.currentProduct = product;
            this.currentVariants = variantsOfProduct;
            this.render();
            this.initThumbnailChange();
            this.initOptionToggle();
            this.initAddToCart();
        }
        catch (error) {
            console.error("Product detail error:", error);
        }
    }
    render() {
        const container = document.querySelector("#productDetail");
        if (!container)
            return;
        container.innerHTML = this.view.renderProductDetail(this.currentProduct, this.currentVariants);
    }
    // ================= IMAGE =================
    initThumbnailChange() {
        const thumbnails = document.querySelectorAll(".thumbnail");
        const mainImage = document.querySelector("#main-product-image");
        if (!mainImage)
            return;
        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                const newSrc = thumb.dataset.image;
                if (newSrc)
                    mainImage.src = newSrc;
                thumbnails.forEach((t) => {
                    t.classList.remove("ring-2", "ring-p-900");
                    t.classList.add("ring-1", "ring-n-200");
                });
                thumb.classList.remove("ring-1", "ring-n-200");
                thumb.classList.add("ring-2", "ring-p-900");
            });
        });
    }
    // ================= SIZE TOGGLE =================
    initOptionToggle() {
        const priceEl = document.querySelector("#product-price");
        if (!priceEl)
            return;
        const labels = document.querySelectorAll(".size-option");
        labels.forEach((label) => {
            const input = label.querySelector("input");
            if (!input)
                return;
            label.addEventListener("click", () => {
                labels.forEach((l) => {
                    l.classList.remove("ring-2", "ring-p-900");
                    l.classList.add("ring-1", "ring-n-200");
                    const radio = l.querySelector("input");
                    if (radio)
                        radio.checked = false;
                });
                label.classList.remove("ring-1", "ring-n-200");
                label.classList.add("ring-2", "ring-p-900");
                input.checked = true;
                const extra = Number(input.dataset.price || 0);
                const finalPrice = this.currentProduct.basePrice + extra;
                priceEl.textContent = finalPrice.toLocaleString("vi-VN") + "₫";
            });
        });
        // set giá mặc định theo option đầu
        const first = document.querySelector('input[name="size"]:checked');
        if (first) {
            const extra = Number(first.dataset.price || 0);
            priceEl.textContent = (this.currentProduct.basePrice + extra).toLocaleString("vi-VN") + "₫";
        }
    }
    // ================= ADD TO CART =================
    initAddToCart() {
        const btn = document.querySelector("#add-to-cart");
        if (!btn)
            return;
        btn.addEventListener("click", () => {
            const quantityInput = document.querySelector("#product-quantity");
            const sizeInput = document.querySelector("input[name='size']:checked");
            if (!quantityInput || !sizeInput)
                return;
            const quantity = Number(quantityInput.value);
            const variant_id = sizeInput.dataset.id;
            if (!variant_id) {
                alert("Không tìm thấy biến thể");
                return;
            }
            const extraPrice = Number(sizeInput.dataset.price || 0);
            const finalPrice = this.currentProduct.basePrice + extraPrice;
            const item = new CartItem(this.currentProduct.id, variant_id, this.currentProduct.name, finalPrice, this.currentProduct.image, quantity, sizeInput.value, "");
            this.cartService.add(item);
            alert("Đã thêm vào giỏ hàng!");
        });
    }
}
//# sourceMappingURL=ProductDetailController.js.map