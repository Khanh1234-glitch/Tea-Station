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
import type { PartnerLogo } from "../Model/PartnerLogo.js";
import { PartnerLogoService } from "../service/PartnerLogoService.js";

export class HomeController {
    private homeView = new HomeView();
    private productService = new ProductService();
    private categoryService = new CategoryService();
    private featureService = new FeatureService();
    private heroService = new HeroService();
    private bestSellerService = new BestSellerService();
    private siteStatService = new SiteStatService();
    private aboutService = new AboutService();
    private heroSectionSerive = new HeroSectionService();
    private partnerLogoService = new PartnerLogoService();

    public init() {
        this.renderHomeView();
    }

    async renderHomeView() {
        const products: Product[] = await this.productService.getAll();
        const categories: Category[] = await this.categoryService.getAll();
        const features: Feature = await this.featureService.getAll();
        const hero: Hero = await this.heroService.getAll();
        const bestSeller: BestSeller = await this.bestSellerService.getAll();
        const siteStat: siteStat = await this.siteStatService.getAll();
        const about: About = await this.aboutService.getAll();
        const heroSection: HeroSection = await this.heroSectionSerive.getAll();
        const partnerLogo: PartnerLogo[] = await this.partnerLogoService.getAll();

        document.querySelector("#products-tabs")!.innerHTML = this.homeView.render(products, categories);

        document.querySelector("#features")!.innerHTML = this.homeView.renderFeature(features);

        document.querySelector("#slogan")!.innerHTML = this.homeView.renderHero(hero);

        document.querySelector("#best-sellers")!.innerHTML = this.homeView.renderBestSeller(bestSeller);
        document.querySelector("#stats")!.innerHTML = this.homeView.renderSiteStat(siteStat);
        document.querySelector("#story")!.innerHTML = this.homeView.renderAbout(about);
        document.querySelector("#hero")!.innerHTML = this.homeView.renderHeroSection(heroSection);
        document.querySelector("#partner-logo-list")!.innerHTML = this.homeView.renderPartnerLogo(partnerLogo);
        this.observeSiteStat();

        this.initProductTabs();

        this.observeBestSeller();
    }

    private observeSiteStat() {
        const section = document.querySelector("#stats");
        if (!section) return;

        const counters = section.querySelectorAll<HTMLElement>("[data-count]");

        const animateCounter = (el: HTMLElement) => {
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

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        counters.forEach((el) => animateCounter(el));
                    } else {
                        counters.forEach((el) => {
                            el.textContent = "0";
                        });
                    }
                });
            },
            { threshold: 0.4 },
        );

        observer.observe(section);
    }

    private initProductTabs() {
        requestAnimationFrame(() => {
            const $tabs = (window as any).$("#products-tabs");
            if (!$tabs.length) return;

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

            $items.on("click", (event: Event) => {
                $items.removeClass("activeTab");

                const target = event.currentTarget as HTMLElement;
                (window as any).$(target).addClass("activeTab");
            });

            (window as any).AOS?.refreshHard();
        });
    }

    private observeBestSeller() {
        const section = document.querySelector("#best-sellers");
        if (!section) return;

        section.classList.add("opacity-0", "translate-y-16", "transition-all", "duration-700", "ease-out");

        let initialized = false;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !initialized) {
                        initialized = true;

                        section.classList.remove("opacity-0", "translate-y-16");
                        section.classList.add("opacity-100", "translate-y-0");

                        this.initBestSellerSlider();

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 },
        );

        observer.observe(section);
    }

    private initBestSellerSlider() {
        const $slider = (window as any).$(".slider");
        if (!$slider.length) return;

        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }

        $slider.on("init", (_: any, slick: any) => {
            const firstSlide = slick.$slides[0];
            this.animateSlideProgress(firstSlide);
        });

        $slider.on("afterChange", (_: any, slick: any, current: number) => {
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

        (window as any).AOS?.refreshHard();
    }

    private animateSlideProgress(slide: HTMLElement) {
        slide.querySelectorAll("[progress-bar]").forEach((el) => {
            this.animateProgressBar(el);
        });
    }

    private animateProgressBar(el: Element) {
        const percentAttr = el.getAttribute("data-percentage");
        if (!percentAttr) return;

        const target = parseInt(percentAttr.replace("%", ""), 10);

        const fill = el.querySelector(".progress-fill") as HTMLElement;
        const percentText = el.querySelector(".percent") as HTMLElement;
        const marker = el.querySelector(".progress-number") as HTMLElement;

        if (!fill || !percentText || !marker) return;

        fill.style.width = "0%";
        percentText.textContent = "0%";
        marker.style.left = "0%";

        const duration = 800;
        const start = performance.now();

        const animate = (now: number) => {
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
