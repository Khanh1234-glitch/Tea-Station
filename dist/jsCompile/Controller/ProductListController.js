import { ProductListService } from "../service/ProductListService.js";
import { ProductView } from "../Views/ProductView.js";
export class ProductListController {
    constructor() {
        this.productListView = new ProductView();
        this.productListService = new ProductListService();
    }
    init() {
        this.renderProductListViews();
    }
    async renderProductListViews() {
        const productList = await this.productListService.getAll();
        document.querySelector("#productList").innerHTML = this.productListView.renderProducts(productList);
    }
}
//# sourceMappingURL=ProductListController.js.map