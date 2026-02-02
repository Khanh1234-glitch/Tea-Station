import type { Benefits, BestSeller } from "../Model/BestSellers.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Feature.js";
import type { Hero } from "../Model/Hero.js";
import type { Product } from "../Model/Product.js";

export class HomeView {
    renderProducts(products: Product[]): string {
        if (products.length === 0) {
            return `<div>Không có sản phẩm</div>`;
        }

        return products
            .map(
                (p) => `
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
            `,
            )
            .join("");
    }

    renderTabMenu(categories: Category[]): string {
        return `
            <ul class="flex justify-center gap-4 px-4 py-4 text-center bg-p-50 md:px-10 xl:px-50 md:py-6 md:gap-8 mb-9">
                ${categories
                    .map(
                        (c, index) => `
                        <li>
                            <a href="#${c.slug}" class="tab-link">
                                <span>Trà</span> ${c.name}
                            </a>
                        </li>
                        ${index < categories.length - 1 ? "<li>|</li>" : ""}
                    `,
                    )
                    .join("")}
            </ul>
        `;
    }

    renderTabContent(products: Product[], categories: Category[]): string {
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

    render(products: Product[], categories: Category[]): string {
        return `
    
                ${this.renderTabMenu(categories)}
                ${this.renderTabContent(products, categories)}
            
        `;
    }
    renderHero(hero: Hero): string {
        return `
            <div class="relative min-w-full h-[30vh] max-h-69 overflow-hidden flex justify-center items-center">
                <video
                    poster="../public/assets/${hero.src}"
                    autoplay
                    loop
                    muted
                    class="absolute inset-0 min-w-full min-h-full -z-10 md:top-[-20%] md:left-[-50%] md:translate-x-1/2"
                >
                    <source src="../public/assets/${hero.src}" type="video/mp4" />
                </video>

                <p class="px-4 text-base tracking-wide text-center text-white md:text-2xl text-shadow-[2px_2px_8px_#000000]">
                    ${hero.text}
                </p>
            </div>
        `;
    }
    renderFeature(feature: Feature): string {
        const leftTop = feature.items.find((i) => i.position === "left-top");
        const rightTop = feature.items.find((i) => i.position === "right-top");
        const leftBottom = feature.items.find((i) => i.position === "left-bottom");
        const rightBottom = feature.items.find((i) => i.position === "right-bottom");
        return `
            <div class="container relative m-20 text-center">
                <!-- hàng đầu -->
                <div class="flex flex-col items-center justify-center w-full gap-0 lg:gap-10 lg:flex-row">
                   
                ${
                    leftTop
                        ? `
                     <div data-aos="${leftTop.aos.animation}" class="feature-card group bg-[url(../public/assets/${leftTop.image})]">
                        <div class="feature-filter"></div>

                        <h3>${leftTop.title}</h3>
                        <p>${leftTop.description}</p>
                    </div>
                    `
                        : ""
                }
                   

                    <div data-aos="zoom-in" data-aos-delay="400" class="order-first bg-p-50 feature-card lg:order-0 lg:bg-transparent">
                        <div>
                            <h2 class="sub_heading">${feature.heading.subTitle}</h2>
                            <h1 class="leading-loose text-center main_heading">
                               ${feature.heading.title}
                            </h1>
                        </div>
                    </div>
                ${
                    rightTop
                        ? `
                            <div data-aos="${rightTop?.aos.animation}" data-aos-delay="${rightTop?.aos.delay}" class="feature-card group bg-[url(../public/assets/${rightTop.image})]">
                                <div class="feature-filter"></div>
                                    <h3>${rightTop.title}</h3>
                                    <p>${rightTop.description}</p>
                                </div>
                        `
                        : ""
                }
      
                </div>

                <!-- hàng thứ 2 -->

                <div class="flex flex-col items-center justify-center w-full lg:-mt-20 lg:gap-10 lg:flex-row">
                ${
                    leftBottom
                        ? `
                    <div data-aos="${leftBottom.aos.animation}" data-aos-delay="${leftBottom.aos.delay}" class="feature-card group bg-[url(../public/assets/${leftBottom.image})]">
                        <div class="feature-filter"></div>

                        <h3>${leftBottom.title}</h3>
                        <p>
                            ${leftBottom.description}
                        </p>
                    </div>
                    `
                        : ""
                }    
                    
                ${
                    rightBottom
                        ? `
                    <div data-aos="${rightBottom.aos.animation}" data-aos-delay="${rightBottom.aos.delay}" class="feature-card group bg-[url(../public/assets/${rightBottom.image})]">
                        <div class="feature-filter"></div>

                        <h3>${rightBottom.title}</h3>
                        <p>${rightBottom.description}</p>
                    </div>
                    `
                        : ""
                }

                </div>
            </div>
        `;
    }
    renderBestSeller(bestSeller: BestSeller): string {
        return `
    <div class="container my-20">
      <!-- tiêu đề -->
      <div class="flex flex-col items-start md:items-center lg:items-start">
        <div data-aos="fade-right">
          <h2 class="sub_heading">${bestSeller.heading.subTitle}</h2>
          <h2 class="main_heading">${bestSeller.heading.title}</h2>
        </div>

        <p
          data-aos="fade-right"
          data-aos-delay="100"
          class="max-w-lg pr-16 mt-2 text-xs text-start md:text-center lg:text-start text-n-500"
        >
          ${bestSeller.description}
        </p>
      </div>
    </div>

    <div class="lg:px-4 md:x-2 mt-9 slider">
      ${bestSeller.products.map((p) => this.renderBestSellerProduct(p)).join("")}
    </div>
  `;
    }
    private renderBestSellerProduct(p: any): string {
        const top = p.benefits.slice(0, 2);
        const bottom = p.benefits.slice(2, 4);

        const renderBenefit = (b: Benefits) => `
    <div class="flex-1 progressbar-item">
      <h4 class="progress-title">${b.title}</h4>
      <div progress-bar data-percentage="${b.percentage}%">
        <div class="progress-number">
          <div class="progress-number-mark">
            <span class="percent"></span>
            <span class="down-arrow"></span>
          </div>
        </div>
        <div class="progress-bg">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  `;

        return `
    <div class="flex! flex-col lg:flex-row items-center justify-between">
      <div class="flex-1 best-product--left">
        <div class="best-product-info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>

        <div class="benefit-bars">
          <div>${top.map(renderBenefit).join("")}</div>
          <div>${bottom.map(renderBenefit).join("")}</div>
        </div>
      </div>

      <div>
        <img src="../public/assets/${p.image}" alt="best-sellers-product" />
      </div>
    </div>
  `;
    }
}
