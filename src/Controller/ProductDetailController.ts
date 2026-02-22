import { CartItem } from "../Model/CartItem.js";
<<<<<<< HEAD
import { ProductList, Size, Variants } from "../Model/ProductList.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";

export class ProductDetailController {
    private DetailView = new ProductDetailViews();
    private productDetailService = new ProductListService();
    private productDetail: ProductList | null = null;
    private total: number | null = null;
    private selectedSize: Size | null = null;
    private selectedVariant: Variants | null = null;

    async init() {
        const URLParams: URLSearchParams = new URLSearchParams(window.location.search);
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
    private renderProductDetail(): void {
        if (!this.productDetail) {
            alert("Không tìm thấy sản phẩm");
            return;
        }
        document.querySelector("#productDetail")!.innerHTML = this.DetailView.renderProductDetail(this.productDetail);
    }

    private addEvents(): void {
        const sizeRadios = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="size"]');
        const variantRadios = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="variant"]`);
        const basePrice = this.productDetail?.basePrice ?? 0;
        variantRadios.forEach((v) => {
            v.addEventListener("change", (e: Event) => {
                const input = e.currentTarget as HTMLInputElement;
                if (!input.checked) return;

                const id = input.dataset.id!;
                const name = input.dataset.name!;

                this.selectedVariant = new Variants(id, name);

                // remove highlight all
                variantRadios.forEach((r) => {
                    r.closest("label")?.classList.remove("ring-p-900", "ring-2");
                });

                // add highlight current
                input.closest("label")?.classList.add("ring-p-900", "ring-2");

                console.log("SELECTED VARIANT:", this.selectedVariant);
            });

            // init highlight (radio checked sẵn)
            if (v.checked) {
                v.closest("label")?.classList.add("ring-p-900", "ring-2");
            }
        });
        sizeRadios.forEach((rd) => {
            rd.addEventListener("change", (e: Event) => {
                const input = e.currentTarget as HTMLInputElement;
                if (!input.checked) return;

                const id = input.dataset.id!;
                const name = input.dataset.name!;
                const price = Number(input.dataset.price || 0);

                this.selectedSize = new Size(id, name, price);
                sizeRadios.forEach((r) => {
                    r.closest("label")?.classList.remove("ring-p-900", "ring-2");
                });

                // 2. Thêm highlight cho label đang check
                if (rd.checked) {
                    rd.closest("label")?.classList.add("ring-p-900", "ring-2");
                }
                this.total = basePrice + price;

                console.log("TOTAL:", this.total);
                console.log("SELECTED SIZE:", this.selectedSize);
                document.querySelector("#product-price")!.innerHTML = this.total.toLocaleString("vi-VN");
            });
        });
        document.querySelector("#addToCart")?.addEventListener("click", (e) => {
            this.addToCart();
        });
    }
    private addToCart(): void {
        const quantityInput = document.querySelector<HTMLInputElement>("#quantity");
        const quantity = Number(quantityInput?.value || 1);
        if (!this.productDetail || !this.selectedSize || !this.selectedVariant) {
            alert("Vui lòng chọn kích cỡ và biến thể");
            return;
        }

        let cart: CartItem[] = [];

        if (localStorage.getItem("cart-tea")) {
            cart = JSON.parse(localStorage.getItem("cart-tea") || "[]");
        }
        if (!this.selectedVariant) return;
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
=======
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
            const priceEl = document.querySelector("#product-price");
            const quantityInput = document.querySelector<HTMLInputElement>("#product-quantity");
            const sizeInput = document.querySelector<HTMLInputElement>("input[name='size']:checked");
            const variantInput = document.querySelector<HTMLInputElement>("input[name='variant']:checked");
            const price = priceEl ? Number(priceEl.textContent?.replace(/[^\d]/g, "")) : this.currentProduct.basePrice;

            if (!quantityInput || !sizeInput || !variantInput) return;
            const quantity = Number(quantityInput.value);
            const size = sizeInput.value;
            const variant = variantInput.value;
            const extraPrice = Number(sizeInput.dataset.price || 0);

            const finalPrice = this.currentProduct.basePrice + extraPrice;
            const item = new CartItem(
                this.currentProduct.id,
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
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
