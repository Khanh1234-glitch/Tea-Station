export class HomeView {
    renderProducts(products) {
        if (products.length === 0) {
            return `<div>Không có sản phẩm</div>`;
        }
        return products
            .map((p) => `
                <div class="tabContainer">
                    <img src="../public/assets/${p.image}" alt="${p.slug}" class="productImg" />

                    <div>
                        <h3>${p.name}</h3>
                        <h4>${p.short_desc}</h4>
                        <p>
                            ${p.description}
                        </p>
                        <button>
                            <a href="/Views/products.html?filter-category=${p.idName}" class="btn">
                                Xem Sản Phẩm ${p.name}
                                <img src="../public/assets/right-arrow.svg" alt="right-arrow" />
                            </a>
                        </button>
                    </div>
                </div>
            `)
            .join("");
    }
    renderTabMenu(categories) {
        return `
            <ul class="flex justify-center gap-4 px-4 py-4 text-center bg-p-50 md:px-10 xl:px-50 md:py-6 md:gap-8 mb-9">
                ${categories
            .map((c, index) => `
                        <li>
                            <a href="#${c.slug}" class="tab-link">
                                <span>Trà</span> ${c.name}
                            </a>
                        </li>
                        ${index < categories.length - 1 ? "<li>|</li>" : ""}
                    `)
            .join("")}
            </ul>
        `;
    }
    renderTabContent(products, categories) {
        return categories
            .map((c) => {
            const productInCategory = products.filter((p) => p.category_id === c.id);
            return `
                    <div id="${c.slug}">
                        ${this.renderProducts(productInCategory)}
                    </div>
                `;
        })
            .join("");
    }
    render(products, categories) {
        return `
    
                ${this.renderTabMenu(categories)}
                ${this.renderTabContent(products, categories)}
            
        `;
    }
}
//# sourceMappingURL=HomeViews.js.map