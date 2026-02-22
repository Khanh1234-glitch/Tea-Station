import type { Category } from "../Model/Category.js";
import type { pageProducts } from "../Model/PageProduct.js";
import { ProductList } from "../Model/ProductList.js";
export declare class ProductView {
    renderProducts(products: ProductList[]): string;
    renderFilterCategory(categories: Category[]): string;
    renderBanner(pageProducts: pageProducts[]): string;
}
//# sourceMappingURL=ProductView.d.ts.map