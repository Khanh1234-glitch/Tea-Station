import { ProductList } from "../Model/ProductList.js";
export class ProductViews {
    renderProductList(product) {
        return product
            .map((p) => `
                        <div class="relative col-span-3 overflow-hidden group hover:shadow-md">
                            <div class="portfolio-item">
                                <div>
                                    <img src="../public/assets/${p.image}" alt="${p.name}" />
                                    <div class="product-item-overlay">
                                        <div class="product-details">
                                            <h3>${p.name}</h3>
                                            <p>${p.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        `)
            .join(``);
    }
}
//# sourceMappingURL=ProductViews.js.map