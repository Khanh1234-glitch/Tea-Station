import type { About } from "../Model/About.js";
import type { BestSeller } from "../Model/BestSeller.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Features.js";
import type { Hero } from "../Model/Hero.js";
import type { Product } from "../Model/Product.js";
import type { SiteStat } from "../Model/SiteStat.js";
export declare class HomeView {
    renderProducts(products: Product[]): string;
    renderSlogan(slogan: Hero): string;
    renderTabMenu(categories: Category[]): string;
    renderTabContent(products: Product[], categories: Category[]): string;
    render(products: Product[], categories: Category[]): string;
    renderFeature(feature: Feature): string;
    renderBestSeller(bestSeller: BestSeller): string;
    renderSiteStat(stat: SiteStat): string;
    renderAbout(about: About): string;
}
//# sourceMappingURL=HomeViews.d.ts.map