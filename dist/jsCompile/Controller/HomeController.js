import { Product } from "../Model/Product.js";
import { CategoryService } from "../service/CategoryService.js";
import { ProductService } from "../service/ProductService.js";
import { HomeView } from "../Views/HomeViews.js";
export class HomeController {
    constructor() {
        this.homeView = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }
    init() {
        this.renderHomeView();
    }
    async renderHomeView() {
        let products = await this.productService.getAll();
        let category = await this.categoryService.getAll();
        document.querySelector("#products-tabs").innerHTML = this.homeView.render(products, category);
    }
}
//# sourceMappingURL=HomeController.js.map