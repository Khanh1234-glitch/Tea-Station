import type { About } from "../Model/About.js";
import type { BestSeller } from "../Model/BestSellers.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Feature.js";
import type { Hero } from "../Model/Hero.js";
import type { HeroSection } from "../Model/HeroSection.js";
import type { Product } from "../Model/Product.js";
import type { siteStat } from "../Model/siteStats.js";
export declare class HomeView {
    renderProducts(products: Product[]): string;
    renderTabMenu(categories: Category[]): string;
    renderTabContent(products: Product[], categories: Category[]): string;
    render(products: Product[], categories: Category[]): string;
    renderHero(hero: Hero): string;
    renderFeature(feature: Feature): string;
    renderBestSeller(bestSeller: BestSeller): string;
    private renderBestSellerProduct;
    renderSiteStat(siteStat: siteStat): string;
    renderAbout(about: About): string;
    renderHeroSection(hero: HeroSection): string;
}
//# sourceMappingURL=HomeViews.d.ts.map