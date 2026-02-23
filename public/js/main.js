/* ================ 
    Nav
  =================== */
$(function () {
    // hide show nav
    $(".navbar").hidescroll();

    // mobile dropdown menu
    const toggleBtn = $("#toggle_btn");
    const dropdownMenu = $(".dropdown-menu");

    toggleBtn.click(() => {
        dropdownMenu.toggleClass("open");
    });
});

/* ================ 
  AOS Animation
  =================== */
$(function () {
    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
        initClassName: "aos-init", // class applied after initialization
        animatedClassName: "aos-animate", // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 100, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: "ease-in-out", // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: true, // whether elements should animate out while scrolling past them
        anchorPlacement: "center-bottom", // defines which position of the element regarding to window should trigger the animation
    });
});
// tab profile

const tabs = document.querySelectorAll(".tab-item");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // reset tab style
        tabs.forEach((t) => {
            t.classList.remove("bg-p-100", "text-p-900", "font-semibold");
            t.classList.add("text-n-500");
        });

        // hide all content
        contents.forEach((c) => c.classList.add("hidden"));

        // active tab
        tab.classList.add("bg-p-100", "text-p-900", "font-semibold");
        tab.classList.remove("text-n-500");

        // show content
        document.getElementById(tab.dataset.tab).classList.remove("hidden");
    });
});
