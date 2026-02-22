import { Product } from "../Model/Product.js";
import { CategoryService } from "../service/CategoryService.js";
import { HomeView } from "../Views/HomeViews.js";
import { siteStat } from "../Model/siteStats.js";
import { SiteStatService } from "../service/SiteStatService.js";
import { AboutService } from "../service/AboutService.js";
import { HeroSection } from "../Model/HeroSection.js";
import { HeroSectionService } from "../service/HeroSectionService.js";
import { PartnerLogoService } from "../service/PartnerLogoService.js";
import { ProductService } from "../service/ProductService.js";
import { HeroService } from "../service/HeroService.js";
import { FeatureService } from "../service/FeatureService.js";
import { BestSellerService } from "../service/BestSellerService.js";
export class HomeController {
    constructor() {
        this.homeView = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
        this.heroService = new HeroService();
        this.featureService = new FeatureService();
        this.bestSellerService = new BestSellerService();
        this.siteStatService = new SiteStatService();
        this.aboutService = new AboutService();
    }
    /* ================= INIT ================= */
    async init() {
        await this.renderPage();
        this.initProductTabs();
    }
    /* ================= MAIN RENDER ================= */
    async renderPage() {
        try {
            const [products, categories, hero] = await Promise.all([
                this.productService.getAll(),
                this.categoryService.getAll(),
                this.heroService.getAll(),
            ]);
            this.renderTabs(products, categories);
            this.renderHero(hero);
        }
        catch (err) {
            console.error("Main section error:", err);
        }
        try {
            const feature = await this.featureService.getFeature();
            this.renderFeature(feature);
        }
        catch (err) {
            console.warn("Feature error:", err);
        }
        try {
            const bestSeller = await this.bestSellerService.getBestSeller();
            this.renderBestSeller(bestSeller);
        }
        catch (err) {
            console.warn("BestSeller error:", err);
        }
        try {
            const stat = await this.siteStatService.getSiteStat();
            this.renderSiteStat(stat);
        }
        catch (err) {
            console.warn("SiteStat error:", err);
        }
        try {
            const about = await this.aboutService.getAbout();
            this.renderAbout(about);
        }
        catch (err) {
            console.warn("About error:", err);
        }
    }
    /* ================= RENDER METHODS ================= */
    renderTabs(products, categories) {
        const container = document.querySelector("#products-tabs");
        if (!container)
            return;
        container.innerHTML = this.homeView.render(products, categories);
    }
    renderHero(hero) {
        const container = document.querySelector("#slogan");
        if (!container)
            return;
        container.innerHTML = this.homeView.renderSlogan(hero);
    }
    renderFeature(feature) {
        var _a;
        const container = document.querySelector("#features");
        if (!container)
            return;
        container.innerHTML = this.homeView.renderFeature(feature);
        (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
    }
    renderBestSeller(bestSeller) {
        const container = document.querySelector("#best-sellers");
        if (!container)
            return;
        container.innerHTML = this.homeView.renderBestSeller(bestSeller);
        setTimeout(() => {
            var _a;
            this.initBestSellerSlider();
            (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
        }, 100);
    }
    renderSiteStat(stat) {
        const container = document.querySelector("#stats");
        if (!container)
            return;
        container.innerHTML = this.homeView.renderSiteStat(stat);
        this.observeSiteStat();
    }
    renderAbout(about) {
        var _a;
        const container = document.querySelector("#story");
        if (!container)
            return;
        container.innerHTML = this.homeView.renderAbout(about);
        (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
    }
    /* ================= PRODUCT TABS ================= */
    initProductTabs() {
        const $tabs = window.$("#products-tabs");
        if (!($tabs === null || $tabs === void 0 ? void 0 : $tabs.length))
            return;
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
        $items.off("click").on("click", (e) => {
            $items.removeClass("activeTab");
            window.$(e.currentTarget).addClass("activeTab");
        });
    }
    /* ================= BEST SELLER SLIDER ================= */
    initBestSellerSlider() {
        const $slider = window.$(".slider");
        if (!($slider === null || $slider === void 0 ? void 0 : $slider.length))
            return;
        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }
        $slider.on("init", (_, slick) => {
            this.animateSlideProgress(slick.$slides[0]);
        });
        $slider.on("afterChange", (_, slick, current) => {
            this.animateSlideProgress(slick.$slides[current]);
        });
        $slider.slick({
            slidesToShow: 1,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
        });
    }
    animateSlideProgress(slide) {
        slide.querySelectorAll("[progress-bar]").forEach((el) => {
            var _a;
            const percent = parseInt(((_a = el.getAttribute("data-percentage")) === null || _a === void 0 ? void 0 : _a.replace("%", "")) || "0", 10);
            const fill = el.querySelector(".progress-fill");
            const numberWrap = el.querySelector(".progress-number");
            const number = el.querySelector(".percent");
            if (!fill || !numberWrap || !number)
                return;
            fill.style.transition = "none";
            fill.style.width = "0%";
            numberWrap.style.left = "0%";
            number.textContent = "0%";
            void fill.offsetWidth;
            fill.style.transition = "width 1.2s ease";
            fill.style.width = percent + "%";
            let start = null;
            const duration = 1200;
            const animate = (timestamp) => {
                if (!start)
                    start = timestamp;
                const progress = timestamp - start;
                const ratio = Math.min(progress / duration, 1);
                const current = Math.floor(ratio * percent);
                number.textContent = current + "%";
                numberWrap.style.left = current + "%";
                if (ratio < 1)
                    requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        });
    }
    /* ================= SITE STAT COUNTER ================= */
    observeSiteStat() {
        const section = document.querySelector("#stats");
        if (!section)
            return;
        const counters = section.querySelectorAll(".counter");
        const animateCounter = (el) => {
            const target = parseFloat(el.dataset.count || "0");
            const duration = 1500;
            let start = null;
            const step = (timestamp) => {
                if (!start)
                    start = timestamp;
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.4 });
        observer.observe(section);
    }
}
//# sourceMappingURL=HomeController.js.map