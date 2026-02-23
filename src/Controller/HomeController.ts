import type { Category } from "../Model/Category.js";
import type { Feature } from "../Model/Features.js";
import type { BestSeller } from "../Model/BestSeller.js";
import type { SiteStat } from "../Model/SiteStat.js";
import type { About } from "../Model/About.js";

import { Product } from "../Model/Product.js";

import { CategoryService } from "../service/CategoryService.js";
import { ProductService } from "../service/ProductService.js";
import { HeroService } from "../service/HeroService.js";
import { FeatureService } from "../service/FeatureService.js";
import { BestSellerService } from "../service/BestSellerService.js";
import { SiteStatService } from "../service/SiteStatService.js";
import { AboutService } from "../service/AboutService.js";

import { HomeView } from "../Views/HomeViews.js";
import { PartnerLogoService } from "../service/PartnerLogoService.js";
import type { PartnerLogo } from "../Model/PartnerLogo.js";

export class HomeController {
    private homeView = new HomeView();

    private productService = new ProductService();
    private categoryService = new CategoryService();
    private heroService = new HeroService();
    private featureService = new FeatureService();
    private bestSellerService = new BestSellerService();
    private siteStatService = new SiteStatService();
    private aboutService = new AboutService();
    private partnerService = new PartnerLogoService();
    /* ================= INIT ================= */

    public async init(): Promise<void> {
        await this.renderPage();
        this.initProductTabs();
    }

    /* ================= MAIN RENDER ================= */

    private async renderPage(): Promise<void> {
        try {
            const [products, categories, hero, partnerLogo] = await Promise.all([
                this.productService.getAll(),
                this.categoryService.getAll(),
                this.heroService.getAll(),
                this.partnerService.getAllLogo(),
            ]);

            this.renderTabs(products, categories);
            this.renderHero(hero);
            this.renderPartner(partnerLogo);
        } catch (err) {
            console.error("Main section error:", err);
        }

        try {
            const feature = await this.featureService.getFeature();
            this.renderFeature(feature);
        } catch (err) {
            console.warn("Feature error:", err);
        }

        try {
            const bestSeller = await this.bestSellerService.getBestSeller();
            this.renderBestSeller(bestSeller);
        } catch (err) {
            console.warn("BestSeller error:", err);
        }

        try {
            const stat = await this.siteStatService.getSiteStat();
            this.renderSiteStat(stat);
        } catch (err) {
            console.warn("SiteStat error:", err);
        }

        try {
            const about = await this.aboutService.getAbout();
            this.renderAbout(about);
        } catch (err) {
            console.warn("About error:", err);
        }
    }

    /* ================= RENDER METHODS ================= */

    private renderTabs(products: Product[], categories: Category[]): void {
        const container = document.querySelector("#products-tabs");
        if (!container) return;
        container.innerHTML = this.homeView.render(products, categories);
    }
    private renderPartner(partner: PartnerLogo[]) {
        const container = document.querySelector("#partner-logo-list");
        if (!container) return;
        container.innerHTML = this.homeView.renderPartnerLogo(partner);
    }
    private renderHero(hero: any): void {
        const container = document.querySelector("#slogan");
        if (!container) return;
        container.innerHTML = this.homeView.renderSlogan(hero);
    }

    private renderFeature(feature: Feature): void {
        const container = document.querySelector("#features");
        if (!container) return;
        container.innerHTML = this.homeView.renderFeature(feature);
        (window as any).AOS?.refreshHard();
    }

    private renderBestSeller(bestSeller: BestSeller): void {
        const container = document.querySelector("#best-sellers");
        if (!container) return;

        container.innerHTML = this.homeView.renderBestSeller(bestSeller);

        setTimeout(() => {
            this.initBestSellerSlider();
            (window as any).AOS?.refreshHard();
        }, 100);
    }

    private renderSiteStat(stat: SiteStat): void {
        const container = document.querySelector("#stats");
        if (!container) return;

        container.innerHTML = this.homeView.renderSiteStat(stat);
        this.observeSiteStat();
    }

    private renderAbout(about: About): void {
        const container = document.querySelector("#story");
        if (!container) return;

        container.innerHTML = this.homeView.renderAbout(about);
        (window as any).AOS?.refreshHard();
    }

    /* ================= PRODUCT TABS ================= */

    private initProductTabs(): void {
        const $tabs = (window as any).$("#products-tabs");
        if (!$tabs?.length) return;

        if ($tabs.hasClass("r-tabs")) {
            $tabs.responsiveTabs("destroy");
        }

        $tabs.responsiveTabs({
            animation: "slide",
            startCollapsed: false,
        });

        const $items = $tabs.find("ul li");

        $items.removeClass("activeTab");
        $items.first().addClass("activeTab");

        $items.off("click").on("click", (e: Event) => {
            $items.removeClass("activeTab");
            (window as any).$(e.currentTarget).addClass("activeTab");
        });
    }

    /* ================= BEST SELLER SLIDER ================= */

    private initBestSellerSlider(): void {
        const $slider = (window as any).$(".slider");
        if (!$slider?.length) return;

        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }

        $slider.on("init", (_: any, slick: any) => {
            this.animateSlideProgress(slick.$slides[0]);
        });

        $slider.on("afterChange", (_: any, slick: any, current: number) => {
            this.animateSlideProgress(slick.$slides[current]);
        });

        $slider.slick({
            slidesToShow: 1,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
        });
    }

    private animateSlideProgress(slide: HTMLElement): void {
        slide.querySelectorAll("[progress-bar]").forEach((el) => {
            const percent = parseInt(el.getAttribute("data-percentage")?.replace("%", "") || "0", 10);

            const fill = el.querySelector(".progress-fill") as HTMLElement;
            const numberWrap = el.querySelector(".progress-number") as HTMLElement;
            const number = el.querySelector(".percent") as HTMLElement;

            if (!fill || !numberWrap || !number) return;

            fill.style.transition = "none";
            fill.style.width = "0%";
            numberWrap.style.left = "0%";
            number.textContent = "0%";

            void fill.offsetWidth;

            fill.style.transition = "width 1.2s ease";
            fill.style.width = percent + "%";

            let start: number | null = null;
            const duration = 1200;

            const animate = (timestamp: number) => {
                if (!start) start = timestamp;

                const progress = timestamp - start;
                const ratio = Math.min(progress / duration, 1);
                const current = Math.floor(ratio * percent);

                number.textContent = current + "%";
                numberWrap.style.left = current + "%";

                if (ratio < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        });
    }

    /* ================= SITE STAT COUNTER ================= */

    private observeSiteStat(): void {
        const section = document.querySelector("#stats");
        if (!section) return;

        const counters = section.querySelectorAll<HTMLElement>(".counter");

        const animateCounter = (el: HTMLElement) => {
            const target = parseFloat(el.dataset.count || "0");
            const duration = 1500;
            let start: number | null = null;

            const step = (timestamp: number) => {
                if (!start) start = timestamp;

                const progress = timestamp - start;
                const ratio = Math.min(progress / duration, 1);

                const value = (target * ratio).toFixed(target % 1 !== 0 ? 1 : 0);

                el.textContent = value + "+";

                if (ratio < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        counters.forEach(animateCounter);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.4 },
        );

        observer.observe(section);
    }
}
