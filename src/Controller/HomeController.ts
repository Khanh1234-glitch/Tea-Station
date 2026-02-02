import type { Benefits, BestSeller } from "../Model/BestSellers.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Feature.js";
import type { Hero } from "../Model/Hero.js";
import { Product } from "../Model/Product.js";
import { BestSellerService } from "../service/BestSellerService.js";
import { CategoryService } from "../service/CategoryService.js";
import { FeatureService } from "../service/FeatureService.js";
import { HeroService } from "../service/HeroService.js";
import { ProductService } from "../service/ProductService.js";
import { HomeView } from "../Views/HomeViews.js";

export class HomeController {
    private homeView = new HomeView();
    private productService = new ProductService();
    private categoryService = new CategoryService();
    private featureService = new FeatureService();
    private heroService = new HeroService();
    private BestSellerService = new BestSellerService();
    public init() {
        this.renderHomeView();
    }
    async renderHomeView() {
        let products: Product[] = await this.productService.getAll();
        let category: Category[] = await this.categoryService.getAll();
        let features: Feature = await this.featureService.getAll();
        let hero: Hero = await this.heroService.getAll();
        let bestSeller: BestSeller = await this.BestSellerService.getAll();
        document.querySelector("#best-sellers")!.innerHTML = this.homeView.renderBestSeller(bestSeller);
        document.querySelector("#features")!.innerHTML = this.homeView.renderFeature(features);
        document.querySelector("#slogan")!.innerHTML = this.homeView.renderHero(hero);
        document.querySelector("#products-tabs")!.innerHTML = this.homeView.render(products, category);
        (window as any).AOS?.refreshHard();
        const $slider = (window as any).$(".slider");
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
        });
    }
}
