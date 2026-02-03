import { ProductList } from "../Model/ProductList.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductDetailViews } from "../Views/ProductDetailViews.js";
export class ProductDetailController {
    constructor() {
        this.DetailView = new ProductDetailViews();
        this.productDetailService = new ProductListService();
        this.productDetail = null;
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
    }
    renderProductDetail() {
        if (!this.productDetail) {
            alert("Không tìm thấy sản phẩm");
            return;
        }
        document.querySelector("#productDetail").innerHTML = this.DetailView.renderProductDetail(this.productDetail);
    }
}
//# sourceMappingURL=ProductDetailController.js.map