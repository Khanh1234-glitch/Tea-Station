import { Category } from "../Model/Category.js";
import { Feature } from "../Model/Feature.js";
import { Hero } from "../Model/Hero.js";
import { BestSeller } from "../Model/BestSellers.js";
import { Product } from "../Model/Product.js";
import { CategoryService } from "../service/CategoryService.js";
import { FeatureService } from "../service/FeatureService.js";
import { HeroService } from "../service/HeroService.js";
import { ProductService } from "../service/ProductService.js";
import { BestSellerService } from "../service/BestSellerService.js";
import { HomeView } from "../Views/HomeViews.js";
import { siteStat } from "../Model/siteStats.js";
import { SiteStatService } from "../service/SiteStatService.js";
import { AboutService } from "../service/AboutService.js";
import { About } from "../Model/About.js";
import { HeroSection } from "../Model/HeroSection.js";
import { HeroSectionService } from "../service/HeroSectionService.js";
import { PartnerLogoService } from "../service/PartnerLogoService.js";
export class HomeController {
    constructor() {
        this.homeView = new HomeView();
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
        this.featureService = new FeatureService();
        this.heroService = new HeroService();
        this.bestSellerService = new BestSellerService();
        this.siteStatService = new SiteStatService();
        this.aboutService = new AboutService();
        this.heroSectionSerive = new HeroSectionService();
        this.partnerLogoService = new PartnerLogoService();
    }
    init() {
        this.renderHomeView();
    }
    async renderHomeView() {
        const products = await this.productService.getAll();
        const categories = await this.categoryService.getAll();
        const features = await this.featureService.getAll();
        const hero = await this.heroService.getAll();
        const bestSeller = await this.bestSellerService.getAll();
        const siteStat = await this.siteStatService.getAll();
        const about = await this.aboutService.getAll();
        const heroSection = await this.heroSectionSerive.getAll();
        const partnerLogo = await this.partnerLogoService.getAll();
        document.querySelector("#products-tabs").innerHTML = this.homeView.render(products, categories);
        document.querySelector("#features").innerHTML = this.homeView.renderFeature(features);
        document.querySelector("#slogan").innerHTML = this.homeView.renderHero(hero);
        document.querySelector("#best-sellers").innerHTML = this.homeView.renderBestSeller(bestSeller);
        document.querySelector("#stats").innerHTML = this.homeView.renderSiteStat(siteStat);
        document.querySelector("#story").innerHTML = this.homeView.renderAbout(about);
        document.querySelector("#hero").innerHTML = this.homeView.renderHeroSection(heroSection);
        document.querySelector("#partner-logo-list").innerHTML = this.homeView.renderPartnerLogo(partnerLogo);
        this.observeSiteStat();
        this.initProductTabs();
        this.observeBestSeller();
    }
    observeSiteStat() {
        const section = document.querySelector("#stats");
        if (!section)
            return;
        const counters = section.querySelectorAll("[data-count]");
        const animateCounter = (el) => {
            const target = Number(el.dataset.count);
            let current = 0;
            const step = Math.ceil(target / 60);
            el.textContent = "0";
            const update = () => {
                current += step;
                if (current >= target) {
                    el.textContent = target.toString();
                    return;
                }
                el.textContent = current.toString();
                requestAnimationFrame(update);
            };
            update();
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    counters.forEach((el) => animateCounter(el));
                }
                else {
                    counters.forEach((el) => {
                        el.textContent = "0";
                    });
                }
            });
        }, { threshold: 0.4 });
        observer.observe(section);
    }
    initProductTabs() {
        requestAnimationFrame(() => {
            var _a;
            const $tabs = window.$("#products-tabs");
            if (!$tabs.length)
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
            $items.on("click", (event) => {
                $items.removeClass("activeTab");
                const target = event.currentTarget;
                window.$(target).addClass("activeTab");
            });
            (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
        });
    }
    observeBestSeller() {
        const section = document.querySelector("#best-sellers");
        if (!section)
            return;
        section.classList.add("opacity-0", "translate-y-16", "transition-all", "duration-700", "ease-out");
        let initialized = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !initialized) {
                    initialized = true;
                    section.classList.remove("opacity-0", "translate-y-16");
                    section.classList.add("opacity-100", "translate-y-0");
                    this.initBestSellerSlider();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(section);
    }
    initBestSellerSlider() {
        var _a;
        const $slider = window.$(".slider");
        if (!$slider.length)
            return;
        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }
        $slider.on("init", (_, slick) => {
            const firstSlide = slick.$slides[0];
            this.animateSlideProgress(firstSlide);
        });
        $slider.on("afterChange", (_, slick, current) => {
            const slide = slick.$slides[current];
            this.animateSlideProgress(slide);
        });
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
        });
        (_a = window.AOS) === null || _a === void 0 ? void 0 : _a.refreshHard();
    }
    animateSlideProgress(slide) {
        slide.querySelectorAll("[progress-bar]").forEach((el) => {
            this.animateProgressBar(el);
        });
    }
    animateProgressBar(el) {
        const percentAttr = el.getAttribute("data-percentage");
        if (!percentAttr)
            return;
        const target = parseInt(percentAttr.replace("%", ""), 10);
        const fill = el.querySelector(".progress-fill");
        const percentText = el.querySelector(".percent");
        const marker = el.querySelector(".progress-number");
        if (!fill || !percentText || !marker)
            return;
        fill.style.width = "0%";
        percentText.textContent = "0%";
        marker.style.left = "0%";
        const duration = 800;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.round(progress * target);
            fill.style.width = value + "%";
            percentText.textContent = value + "%";
            marker.style.left = value + "%";
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
}
//# sourceMappingURL=HomeController.js.map