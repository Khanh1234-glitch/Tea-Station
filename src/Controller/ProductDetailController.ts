import { CartItem } from "../Model/CartItem.js";
import type { ProductList } from "../Model/ProductList.js";
import type { ProductVariant } from "../Model/ProductVariant.js";

import { ProductDetailService } from "../service/ProductDetailService.js";
import { ProductVariantService } from "../service/ProductVariantService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
import { CartService } from "../service/CartService.js";
import { ProductAttributeAdminService } from "../admin/Services/ProductAttributeAdminService.js";
import type { ProductAttributeAdmin } from "../admin/Model/ProductAttributeAdmin.js";

export class ProductDetailController {
    private productService = new ProductDetailService();
    private variantService = new ProductVariantService();
    private view = new ProductDetailViews();
    private cartService = new CartService();
    private productAttributeService = new ProductAttributeAdminService();
    private currentProduct!: ProductList;
    private currentVariants: ProductVariant[] = [];
    private currentAttributes: ProductAttributeAdmin[] = [];

    public async init(): Promise<void> {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id) return;

        try {
            const product = await this.productService.getById(id);
            if (!product || product.status !== "active") {
                window.location.href = "404.html";
                return;
            }
            const allVariants = await this.variantService.getAll();
            const allAtrributes = await this.productAttributeService.getAll();
            const attributesOfProduct = allAtrributes.filter((a) => a.product_id.trim() === product.id.trim());
            const variantsOfProduct = allVariants.filter(
                (v) => String(v.product_id).trim() === String(product.id).trim() && (v.status ?? "active") === "active",
            );

            this.currentProduct = product;
            this.currentVariants = variantsOfProduct;
            this.currentAttributes = attributesOfProduct;
            this.render();
            this.initThumbnailChange();
            this.initOptionToggle();
            this.initAddToCart();
        } catch (error) {
            console.error("Product detail error:", error);
        }
    }

    private render(): void {
        const container = document.querySelector("#productDetail");
        if (!container) return;

        container.innerHTML = this.view.renderProductDetail(this.currentProduct, this.currentVariants, this.currentAttributes);
    }

    // ================= IMAGE =================
    private initThumbnailChange(): void {
        const thumbnails = document.querySelectorAll<HTMLImageElement>(".thumbnail");
        const mainImage = document.querySelector<HTMLImageElement>("#main-product-image");
        if (!mainImage) return;

        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                const newSrc = thumb.dataset.image;
                if (newSrc) mainImage.src = newSrc;

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
    private initOptionToggle(): void {
        const priceEl = document.querySelector<HTMLSpanElement>("#product-price");
        if (!priceEl) return;

        const labels = document.querySelectorAll<HTMLLabelElement>(".size-option");

        labels.forEach((label) => {
            const input = label.querySelector<HTMLInputElement>("input");
            if (!input) return;

            label.addEventListener("click", () => {
                labels.forEach((l) => {
                    l.classList.remove("ring-2", "ring-p-900");
                    l.classList.add("ring-1", "ring-n-200");

                    const radio = l.querySelector<HTMLInputElement>("input");
                    if (radio) radio.checked = false;
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
        const first = document.querySelector<HTMLInputElement>('input[name="size"]:checked');
        if (first) {
            const extra = Number(first.dataset.price || 0);
            priceEl.textContent = (this.currentProduct.basePrice + extra).toLocaleString("vi-VN") + "₫";
        }
    }

    // ================= ADD TO CART =================
    private initAddToCart(): void {
        const btn = document.querySelector("#add-to-cart");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const quantityInput = document.querySelector<HTMLInputElement>("#product-quantity");
            const sizeInput = document.querySelector<HTMLInputElement>("input[name='size']:checked");

            if (!quantityInput || !sizeInput) return;

            const quantity = Number(quantityInput.value);
            const variant_id = sizeInput.dataset.id;

            if (!variant_id) {
                alert("Không tìm thấy biến thể");
                return;
            }

            const extraPrice = Number(sizeInput.dataset.price || 0);
            const finalPrice = this.currentProduct.basePrice + extraPrice;

            const item = new CartItem(
                this.currentProduct.id,
                variant_id,
                this.currentProduct.name,
                finalPrice,
                this.currentProduct.image,
                quantity,
                sizeInput.value,
                "", // nếu bạn không dùng variant label riêng
            );

            this.cartService.add(item);

            alert("Đã thêm vào giỏ hàng!");
        });
    }
}
