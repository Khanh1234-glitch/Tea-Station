import { CartItem } from "../Model/CartItem.js";
import { ProductDetailService } from "../service/ProductDetailService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
import { CartService } from "../service/CartService.js";
export class ProductDetailController {
    constructor() {
        this.service = new ProductDetailService();
        this.view = new ProductDetailViews();
        this.cartService = new CartService();
    }
    async init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id)
            return;
        try {
            const product = await this.service.getById(id);
            this.render(product);
            this.initOptionToggle(product.basePrice);
            this.initThumbnailChange();
            this.currentProduct = product;
            this.initAddToCart();
        }
        catch (error) {
            console.error("Product detail error:", error);
        }
    }
    render(product) {
        const container = document.querySelector("#productDetail");
        if (!container)
            return;
        container.innerHTML = this.view.renderProductDetail(product);
    }
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
    initOptionToggle(basePrice) {
        const priceEl = document.querySelector("#product-price");
        const handleGroup = (selector) => {
            const labels = document.querySelectorAll(selector);
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
                    // 🔥 Cập nhật giá ngay tại đây
                    if (priceEl && selector === ".size-option") {
                        const extra = Number(input.dataset.price || 0);
                        const finalPrice = basePrice + extra;
                        priceEl.textContent = finalPrice.toLocaleString("vi-VN") + "₫";
                    }
                });
            });
        };
        handleGroup(".size-option");
        handleGroup(".variant-option");
        // set giá mặc định theo size đầu tiên
        const checked = document.querySelector('input[name="size"]:checked');
        if (checked && priceEl) {
            const extra = Number(checked.dataset.price || 0);
            priceEl.textContent = (basePrice + extra).toLocaleString("vi-VN") + "₫";
        }
    }
    initAddToCart() {
        const btn = document.querySelector("#add-to-cart");
        if (!btn)
            return;
        btn.addEventListener("click", () => {
            var _a;
            const priceEl = document.querySelector("#product-price");
            const quantityInput = document.querySelector("#product-quantity");
            const sizeInput = document.querySelector("input[name='size']:checked");
            const variantInput = document.querySelector("input[name='variant']:checked");
            const price = priceEl ? Number((_a = priceEl.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[^\d]/g, "")) : this.currentProduct.basePrice;
            if (!quantityInput || !sizeInput || !variantInput)
                return;
            const quantity = Number(quantityInput.value);
            const size = sizeInput.value;
            const variant = variantInput.value;
            const extraPrice = Number(sizeInput.dataset.price || 0);
            const finalPrice = this.currentProduct.basePrice + extraPrice;
            const item = new CartItem(this.currentProduct.id, this.currentProduct.name, finalPrice, this.currentProduct.image, quantity, size, variant);
            this.cartService.add(item);
            alert("Đã thêm vào giỏ hàng!");
        });
    }
}
//# sourceMappingURL=ProductDetailController.js.map