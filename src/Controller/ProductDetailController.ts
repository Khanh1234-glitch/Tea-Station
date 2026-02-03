import { ProductList } from "../Model/ProductList.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";

export class ProductDetailController {
    private DetailView = new ProductDetailViews();
    private productDetailService = new ProductListService();
    private productDetail: ProductList | null = null;
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
    }
    private renderProductDetail(): void {
        if (!this.productDetail) {
            alert("Không tìm thấy sản phẩm");
            return;
        }
        document.querySelector("#productDetail")!.innerHTML = this.DetailView.renderProductDetail(this.productDetail);
    }
}
