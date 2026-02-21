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
    renderSlogan(slogan) {
        return `
                    <div class="relative min-w-full h-[30vh] max-h-69 overflow-hidden flex justify-center items-center">
                <video
                    poster="../public/assets/${slogan.src}"
                    autoplay
                    loop
                    muted
                    class="absolute inset-0 min-w-full min-h-full -z-10 md:top-[-20%] md:left-[-50%] md:translate-x-1/2"
                >
                    <source src="../public/assets/${slogan.src}" type="video/mp4" />
                </video>

                <p class="px-4 text-base tracking-wide text-center text-white md:text-2xl text-shadow-[2px_2px_8px_#000000]">
                  ${slogan.text}
                </p>
            </div>
        
        `;
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
    renderFeature(feature) {
        const getItem = (pos) => feature.item.find((i) => i.position === pos);
        const renderCard = (item) => {
            if (!item)
                return "";
            return `
            <div 
                data-aos="${item.aos.animation}" 
                data-aos-delay="${item.aos.delay || 0}"
                class="feature-card group bg-cover bg-center"
                style="background-image: url('../public/assets/${item.image}')"
            >
                <div class="feature-filter"></div>

                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        };
        return `
        <section id="features">
            <div class="container relative m-20 text-center">

                <!-- HÀNG 1 -->
                <div class="flex flex-col items-center justify-center w-full gap-0 lg:gap-10 lg:flex-row">

                    ${renderCard(getItem("left-top"))}

                    <div data-aos="zoom-in" 
                         class="order-first bg-p-50 feature-card lg:order-0 lg:bg-transparent">

                        <div>
                            <h2 class="sub_heading">
                                ${feature.heading.subTitle}
                            </h2>

                            <h1 class="leading-loose text-center main_heading">
                                ${feature.heading.title}
                            </h1>
                        </div>

                    </div>

                    ${renderCard(getItem("right-top"))}

                </div>

                <!-- HÀNG 2 -->
                <div class="flex flex-col items-center justify-center w-full lg:-mt-20 lg:gap-10 lg:flex-row">

                    ${renderCard(getItem("left-bottom"))}
                    ${renderCard(getItem("right-bottom"))}

                </div>

            </div>
        </section>
    `;
    }
    renderBestSeller(bestSeller) {
        const renderBenefit = (benefit) => `
        <div class="flex-1 progressbar-item">
            <h4 class="progress-title">${benefit.title}</h4>
            <div progress-bar data-percentage="${benefit.percentage}">
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
        const renderProduct = (product) => {
            const topBenefits = product.benefits.slice(0, 2);
            const bottomBenefits = product.benefits.slice(2, 4);
            return `
        <div class="flex! flex-col lg:flex-row items-center justify-between">

            <div class="flex-1 best-product--left">

                <div class="best-product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>

                <div class="benefit-bars">

                    <!-- TOP ROW -->
                    <div class="flex gap-6">
                        ${topBenefits.map(renderBenefit).join("")}
                    </div>

                    <!-- BOTTOM ROW -->
                    <div class="flex gap-6 mt-6">
                        ${bottomBenefits.map(renderBenefit).join("")}
                    </div>

                </div>
            </div>

            <div>
                <img src="../public/assets/${product.image}" alt="${product.name}" />
            </div>

        </div>
    `;
        };
        return `
        <section id="best-sellers">
            <div class="container my-20">

                <!-- HEADING -->
                <div class="flex flex-col items-start md:items-center lg:items-start">
                    <div data-aos="fade-right">
                        <h2 class="sub_heading">
                            ${bestSeller.heading.subTitle}
                        </h2>
                        <h2 class="main_heading">
                            ${bestSeller.heading.title}
                        </h2>
                    </div>

                    <p data-aos="fade-right"
                       data-aos-delay="100"
                       class="max-w-lg pr-16 mt-2 text-xs text-start md:text-center lg:text-start text-n-500">
                        ${bestSeller.description}
                    </p>
                </div>

                <!-- SLIDER -->
                <div class="lg:px-4 md:x-2 mt-9 slider">
                    ${bestSeller.products.map(renderProduct).join("")}
                </div>

            </div>
        </section>
    `;
    }
    renderSiteStat(stat) {
        return `
        <section id="stats"
            class="relative mt-20 bg-fixed bg-center bg-no-repeat bg-cover bg-[url(../public/assets/statsBg.jpg)]">

            <div class="absolute inset-0 bg-p-950/95"></div>

            <div class="container relative z-10 flex flex-col items-center justify-center px-4 py-20 lg:py-28 gap-14 lg:gap-32 md:flex-row">

                <div class="stats-item">
                    <h1 class="counter" data-count="${stat.products}">
                        0+
                    </h1>
                    <h2>Hương Vị Pha Chế</h2>
                </div>

                <svg viewBox="-1 -1 3 137" width="3" height="137"
                    class="hidden md:block"
                    xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0" x2="0.5" y2="135"
                        stroke="white"
                        stroke-opacity="0.3"
                        fill="none" />
                </svg>

                <div class="stats-item">
                    <h1 class="counter" data-count="${parseInt(stat.customers)}">
                        0k+
                    </h1>
                    <h2>Sản Phẩm Bán Ra Toàn Thế Giới</h2>
                </div>

                <svg viewBox="-1 -1 3 137" width="3" height="137"
                    class="hidden md:block"
                    xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0" x2="0.5" y2="135"
                        stroke="white"
                        stroke-opacity="0.3"
                        fill="none" />
                </svg>

                <div class="stats-item">
                    <h1 class="counter" data-count="${stat.rating}">
                        0+
                    </h1>
                    <h2>Điểm Đánh Giá Từ Khách Hàng</h2>
                </div>

            </div>
        </section>
    `;
    }
    renderAbout(about) {
        return `
        <section id="story">
            <div
                class="flex justify-end h-screen max-h-275 p-0 w-full max-w-none
                       bg-no-repeat bg-center bg-cover"
                style="background-image: url('../public/assets/${about.background}')"
            >
                <div class="w-full h-full lg:w-2/3 ${about.overlay} p-9">

                    <div class="container relative flex items-center justify-center
                                h-full md:justify-end 2xl:justify-center">

                        <div data-aos="fade-right"
                             class="absolute hidden -translate-y-1/2 translate-x-36
                                    top-1/2 right-1/2 md:block 2xl:translate-x-0">

                            <h1 class="uppercase -rotate-90 text-[168px]
                                       text-center leading-37 font-bold
                                       text-p-50 opacity-20">
                                ${about.watermark}
                            </h1>
                        </div>

                        <div class="relative" data-aos="fade-left">

                            <div class="mb-9">
                                <h2 class="text-p-200! sub_heading">
                                    ${about.heading.subTitle}
                                </h2>

                                <h1 class="text-white main_heading">
                                    ${about.heading.title}
                                </h1>
                            </div>

                            <p class="text-n-200 max-w-80">
                                ${about.content.join("<br /><br />")}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    }
}
//# sourceMappingURL=HomeViews.js.map