import type { Category } from "../Model/Category.js";
import { Product } from "../Model/Product.js";
import { CategoryService } from "../service/CategoryService.js";
import { ProductService } from "../service/ProductService.js";
import { HomeView } from "../Views/HomeViews.js";

export class HomeController {
    private homeView = new HomeView();
    private productService = new ProductService();
    private categoryService = new CategoryService();
    public init() {
        this.renderHomeView();
    }
    async renderHomeView() {
        let products: Product[] = await this.productService.getAll();
        let category: Category[] = await this.categoryService.getAll();
        document.querySelector("#products-tabs")!.innerHTML = this.homeView.render(products, category);
    }
}
