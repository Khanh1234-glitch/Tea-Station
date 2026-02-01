import type { Category } from "../Model/Category.js";
import type { Product } from "../Model/Product.js";
export declare class HomeView {
    renderProducts(products: Product[]): string;
    renderTabMenu(categories: Category[]): string;
    renderTabContent(products: Product[], categories: Category[]): string;
    render(products: Product[], categories: Category[]): string;
}
//# sourceMappingURL=HomeViews.d.ts.map