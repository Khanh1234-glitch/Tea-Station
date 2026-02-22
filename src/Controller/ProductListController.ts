import type { ProductList } from "../Model/ProductList.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductView } from "../Views/ProductView.js";

export class ProductListController {
    private productListView = new ProductView();
    private productListService = new ProductListService();
    public init() {
        this.renderProductListViews();
    }
    async renderProductListViews() {
        const productList: ProductList[] = await this.productListService.getAll();
        document.querySelector("#productList")!.innerHTML = this.productListView.renderProducts(productList);
    }
}
