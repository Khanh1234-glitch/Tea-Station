import { CartItem } from "../Model/CartItem.js";
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
    }
}
