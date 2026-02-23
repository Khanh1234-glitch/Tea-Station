import { CartItem } from "../Model/CartItem.js";
import type { ProductList } from "../Model/ProductList.js";
import { ProductDetailService } from "../service/ProductDetailService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
import { CartService } from "../service/CartService.js";
export class ProductDetailController {
    private service = new ProductDetailService();
    private view = new ProductDetailViews();
    private cartService = new CartService();
    private currentProduct!: ProductList;
    public async init(): Promise<void> {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) return;

        try {
            const product = await this.service.getById(id);
            this.render(product);
            this.initOptionToggle(product.basePrice);
            this.initThumbnailChange();
            this.currentProduct = product;
            this.initAddToCart();
        } catch (error) {
            console.error("Product detail error:", error);
        }
    }

    private render(product: ProductList): void {
        const container = document.querySelector("#productDetail");
        if (!container) return;

        container.innerHTML = this.view.renderProductDetail(product);
    }

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

    private initOptionToggle(basePrice: number): void {
        const priceEl = document.querySelector<HTMLSpanElement>("#product-price");

        const handleGroup = (selector: string) => {
            const labels = document.querySelectorAll<HTMLLabelElement>(selector);

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
        const checked = document.querySelector<HTMLInputElement>('input[name="size"]:checked');
        if (checked && priceEl) {
            const extra = Number(checked.dataset.price || 0);
            priceEl.textContent = (basePrice + extra).toLocaleString("vi-VN") + "₫";
        }
    }
    private initAddToCart(): void {
        const btn = document.querySelector("#add-to-cart");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const quantityInput = document.querySelector<HTMLInputElement>("#product-quantity");
            const sizeInput = document.querySelector<HTMLInputElement>("input[name='size']:checked");
            const variantInput = document.querySelector<HTMLInputElement>("input[name='variant']:checked");

            if (!quantityInput || !sizeInput || !variantInput) return;

            const quantity = Number(quantityInput.value);
            const size = sizeInput.value;
            const variant = variantInput.value;

            const variant_id = variantInput.dataset.id!; // 🔥 lấy ID thật

            const extraPrice = Number(sizeInput.dataset.price || 0);
            const finalPrice = this.currentProduct.basePrice + extraPrice;

            const item = new CartItem(
                this.currentProduct.id,
                variant_id,
                this.currentProduct.name,
                finalPrice,
                this.currentProduct.image,
                quantity,
                size,
                variant,
            );

            this.cartService.add(item);

            alert("Đã thêm vào giỏ hàng!");
        });
    }
}
