import type { BestSeller } from "../Model/BestSellers.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Feature.js";
import type { Hero } from "../Model/Hero.js";
import type { Product } from "../Model/Product.js";
export declare class HomeView {
    renderProducts(products: Product[]): string;
    renderTabMenu(categories: Category[]): string;
    renderTabContent(products: Product[], categories: Category[]): string;
    render(products: Product[], categories: Category[]): string;
    renderHero(hero: Hero): string;
    renderFeature(feature: Feature): string;
    renderBestSeller(bestSeller: BestSeller): string;
    private renderBestSellerProduct;
}
//# sourceMappingURL=HomeViews.d.ts.map