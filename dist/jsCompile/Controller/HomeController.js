import { Product } from "../Model/Product.js";
import { BestSellerService } from "../service/BestSellerService.js";
import { CategoryService } from "../service/CategoryService.js";
import { FeatureService } from "../service/FeatureService.js";
import { HeroService } from "../service/HeroService.js";
import { ProductService } from "../service/ProductService.js";
import { HomeView } from "../Views/HomeViews.js";
export class HomeController {
    constructor() {
        this.homeView = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
        this.featureService = new FeatureService();
        this.heroService = new HeroService();
        this.BestSellerService = new BestSellerService();
    }
    init() {
        this.renderHomeView();
    }
    async renderHomeView() {
        var _a;
        let products = await this.productService.getAll();
        let category = await this.categoryService.getAll();
        let features = await this.featureService.getAll();
        let hero = await this.heroService.getAll();
        let bestSeller = await this.BestSellerService.getAll();
        document.querySelector("#best-sellers").innerHTML = this.homeView.renderBestSeller(bestSeller);
        document.querySelector("#features").innerHTML = this.homeView.renderFeature(features);
        document.querySelector("#slogan").innerHTML = this.homeView.renderHero(hero);
        document.querySelector("#products-tabs").innerHTML = this.homeView.render(products, category);
        (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
        const $slider = window.$(".slider");
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
        });
    }
}
//# sourceMappingURL=HomeController.js.map