import type { Category } from "../Model/Category.js";
import type { pageProducts } from "../Model/PageProduct.js";
import { ProductList } from "../Model/ProductList.js";

export class ProductView {
    renderProducts(products: ProductList[]): string {
        return products
            .map(
                (p) => `
            <div class="col-span-6 md:col-span-3 lg:col-span-4">
                <div class="group relative overflow-hidden rounded-xl shadow-lg bg-white">

                    <a href="./productDetail.html?id=${p.id}">
                        <img 
                            src="../public/assets/${p.image}" 
                            alt="${p.name}" 
                            class="w-full h-60 object-cover transition duration-500 group-hover:scale-110"
                        />
                    </a>

                    <div class="p-4">

                        <h3 class="text-lg font-semibold text-p-900">
                            ${p.name}
                        </h3>

                        <p class="mt-2 text-sm text-n-500 line-clamp-2">
                            ${p.description}
                        </p>

                        <div class="flex items-center justify-between mt-4">

                            <span class="text-p-700 font-bold">
                                ${p.basePrice.toLocaleString()}đ
                            </span>

                            <a href="./productDetail.html?id=${p.id}" 
                                class="px-3 py-1 text-sm text-white bg-p-700 rounded-lg hover:bg-p-800"
                            >
                                Mua ngay
                            </a>

                        </div>

                    </div>

                </div>
            </div>
        `,
            )
            .join("");
    }
    renderFilterCategory(categories: Category[]): string {
        return `
        <a href="?">Tất cả sản phẩm</a>
        ${categories
            .map(
                (cat) => `
            <a href="?filter-category=${cat.slug}">
                ${cat.name}
            </a>
        `,
            )
            .join("")}
    `;
    }
    renderBanner(pageProducts: pageProducts[]): string {
        return pageProducts
            .map(
                (p) => `
                    <img
                        data-aos="flip-up"
                        src="../public/assets/banners/${p.banner}"
                        alt="${p.slug}"
                        class="w-full h-87.5 object-cover shadow-xl"
                    />

                    <!-- tiêu đề -->
                    <div class="mt-4 md:mt-9">
                        <div data-aos="fade-right">
                            <h2 class="sub_heading">${p.subtitle}</h2>
                            <h1 class="main_heading">${p.title}</h1>
                        </div>

                        <p data-aos="fade-right" data-aos-delay="100" class="max-w-lg mt-2 text-xs text-n-500">
                            ${p.description}
                        </p>
                    </div>
        `,
            )
            .join(``);
    }
}
