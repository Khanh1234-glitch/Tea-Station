import type { About } from "../Model/About.js";
import type { Benefits, BestSeller } from "../Model/BestSellers.js";
import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Feature.js";
import type { Hero } from "../Model/Hero.js";
import type { HeroSection } from "../Model/HeroSection.js";
import type { PartnerLogo } from "../Model/PartnerLogo.js";
import type { Product } from "../Model/Product.js";
import type { siteStat } from "../Model/siteStats.js";

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
                                 ${c.name}
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

            <!-- slider PHẢI nằm trong container -->
            <div class="lg:px-4 md:px-2 mt-9 slider">
                ${bestSeller.products.map((p) => this.renderBestSellerProduct(p)).join("")}
            </div>
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
                    <img src="../public/assets/${p.image}" alt="${p.slug}" />
                </div>
            </div>
        `;
    }
    renderSiteStat(siteStat: siteStat): string {
        return `
       <!-- overlay -->
            <div class="absolute inset-0 bg-p-950/95"></div>

            <!-- nội dung -->
            <div class="container relative z-10 flex flex-col items-center justify-center px-4 py-20 lg:py-28 gap-14 lg:gap-32 md:flex-row">
                <div class="stats-item">
                    <h1 class="counter" data-count="${siteStat.products}">${siteStat.products}+</h1>
                    <h2>Hương Vị Pha Chế</h2>
                </div>

                <svg viewBox="-1 -1 3 137" width="3" height="137" class="hidden md:block" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="-5.90104e-06" y2="135" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0" />
                            <stop offset="0.494792" stop-color="white" />
                            <stop offset="1" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                    <line x1="0.5" y1="0" x2="0.5" y2="135" stroke="url(#lineGradient)" stroke-opacity="0.3" fill="none" />
                </svg>

                <div class="stats-item">
                    <h1 class="counter" data-count="${siteStat.customers}">${siteStat.customers}</h1>
                    <h2>Sản Phẩm Bán Ra Toàn Thế Giới</h2>
                </div>

                <svg viewBox="-1 -1 3 137" width="3" height="137" class="hidden md:block" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="-5.90104e-06" y2="135" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0" />
                            <stop offset="0.494792" stop-color="white" />
                            <stop offset="1" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                    <line x1="0.5" y1="0" x2="0.5" y2="135" stroke="url(#lineGradient)" stroke-opacity="0.3" fill="none" />
                </svg>

                <div class="stats-item">
                    <h1 class="counter" data-count="${siteStat.rating}">${siteStat.rating}+</h1>
                    <h2>Điểm Đánh Giá Từ Khách Hàng</h2>
                </div>
            </div>
        `;
    }
    renderAbout(about: About): string {
        return `
            <div
                class="flex justify-end h-screen max-h-275 p-0 w-full max-w-none bg-[url(../public/assets/aboutUsImg.jpg)] bg-no-repeat bg-center bg-cover"
            >
                <!-- lớp overlay chiếm 2/3 màn hình -->
                <div class="w-full h-full lg:w-2/3 bg-p-950/60 p-9">
                    <div class="container relative flex items-center justify-center h-full md:justify-end 2xl:justify-center">
                        <!-- watermark -->
                        <div
                            data-aos="fade-right"
                            class="absolute hidden -translate-y-1/2 translate-x-36 top-1/2 right-1/2 md:block 2xl:translate-x-0"
                        >
                            <h1 class="uppercase -rotate-90 text-[168px] text-center leading-37 font-bold text-p-50 opacity-20">
                                ${about.watermark}
                            </h1>
                        </div>

                        <!-- nội dung chính -->
                        <div class="relative" data-aos="fade-left">
                            <div class="mb-9">
                                <h2 class="text-p-200! sub_heading">${about.heading.subTitle}</h2>
                                <h1 class="text-white main_heading">${about.heading.title}</h1>
                            </div>

                            <p class="text-n-200 max-w-80">
                               ${about.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
    }
    renderHeroSection(hero: HeroSection): string {
        return `
        <div class="container relative flex items-center justify-center w-full h-full xl:justify-start">
                <!-- hình -->
                <div data-aos="fade-left" class="absolute bottom-0 right-0 z-0 overflow-hidden md:-bottom-40 xl:top-1/2 xl:-translate-y-1/2">
                    <img
                        src="../public/assets/${hero.image}"
                        alt="hero-img"
                        class="h-full 2xl:mask-[linear-gradient(to_left,transparent,black_10%)]"
                    />
                </div>

                <!-- nội dung chính -->

                <div class="z-10 flex flex-col items-center justify-center gap-4 md:gap-9 xl:items-start">
                    <div>
                        <h2
                            data-aos="zoom-in"
                            class="mb-2 text-xs font-semibold leading-none tracking-wider text-center uppercase font-inter md:text-sm xl:text-start"
                        >
                            ${hero.badge.prefix}
                            <span class="text-xs text-gradient md:text-sm">${hero.badge.highlight}</span> ${hero.badge.suffix}
                        </h2>
                        <h1
                            data-aos="zoom-in"
                            data-aos-delay="100"
                            class="text-5xl leading-none tracking-wide text-center capitalize font-lobster text-p-950 md:text-6xl lg:text-7xl"
                        >
                            ${hero.title}
                        </h1>
                    </div>

                    <p data-aos="zoom-in" data-aos-delay="200" class="max-w-xl px-4 text-center text-n-700 md:px-0 xl:text-start">
                       ${hero.description}
                    </p>

                    <button data-aos="zoom-in" data-aos-delay="300">
                        <a class="btn" href="${hero.cta.link}">${hero.cta.text} <img src="../public/assets/right-arrow.svg" alt="right arrow" /></a>
                    </button>
                </div>
            </div>
        
        `;
    }
    renderPartnerLogo(partner: PartnerLogo[]): string {
        return Array(2)
            .fill(null)
            .map(() =>
                partner
                    .map(
                        (p) => `
            <img src="../public/assets/partner-logos/${p.fileName}" alt="${p.alt}" class="logo-ticker-image" />
            
            `,
                    )
                    .join(``),
            )
            .join(``);
    }
}
