import { CategoryService } from "../service/CategoryService.js";
import { ProductListService } from "../service/ProductListService.js";
import { ProductView } from "../Views/ProductView.js";
import { PageProductService } from "../service/PageProductService.js";
export class ProductController {
    constructor() {
        this.productService = new ProductListService();
        this.categoryService = new CategoryService();
        this.pageProductService = new PageProductService();
        this.productView = new ProductView();
    }
    async init() {
        try {
            const [pageProduct, products, categories] = await Promise.all([
                this.pageProductService.getAll(),
                this.productService.getAll(),
                this.categoryService.getAll(),
            ]);
            this.renderPageProduct(pageProduct);
            this.handleFilter(products);
            this.renderFilters(categories);
        }
        catch (error) {
            console.error("Product page error:", error);
        }
    }
    handleFilter(products) {
        const params = new URLSearchParams(window.location.search);
        const category = params.get("filter-category");
        if (!category) {
            this.render(products);
            this.setActiveFilter(null);
            return;
        }
        const filtered = products.filter((p) => p.categoryId.toLowerCase() === category.toLowerCase());
        this.render(filtered);
        this.setActiveFilter(category);
    }
    render(products) {
        const container = document.querySelector("#product-items--container");
        if (!container)
            return;
        const activeProduct = products.filter((p) => p.status === "active");
        container.innerHTML = this.productView.renderProducts(activeProduct);
    }
    /* ================= RENDER FILTER TABS ================= */
    renderFilters(categories) {
        const container = document.querySelector("#allProduct-filters");
        if (!container)
            return;
        container.innerHTML = this.productView.renderFilterCategory(categories);
    }
    renderPageProduct(pageProduct) {
        const pageproduct = document.querySelector("#pageContent");
        if (!pageproduct)
            return;
        pageproduct.innerHTML = this.productView.renderBanner(pageProduct);
    }
    /* ================= ACTIVE FILTER ================= */
    setActiveFilter(category) {
        const links = document.querySelectorAll("#allProduct-filters a");
        links.forEach((link) => {
            link.classList.remove("active-filter");
            const url = new URL(link.href);
            const linkCate = url.searchParams.get("filter-category");
            if (!category && !linkCate) {
                link.classList.add("active-filter");
            }
            if (category && linkCate === category) {
                link.classList.add("active-filter");
            }
        });
    }
}
//# sourceMappingURL=ProductController.js.map