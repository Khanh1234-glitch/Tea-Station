import { ProductListService } from "../service/ProductListService.js";
import { ProductListViews } from "../Views/ProductListViews.js";
export class ProductListController {
    constructor() {
        this.productListView = new ProductListViews();
        this.productListService = new ProductListService();
    }
    init() {
        this.renderProductListViews();
    }
    async renderProductListViews() {
        const productList = await this.productListService.getAll();
        document.querySelector("#productList").innerHTML = this.productListView.renderProductList(productList);
    }
}
//# sourceMappingURL=ProductListController.js.map