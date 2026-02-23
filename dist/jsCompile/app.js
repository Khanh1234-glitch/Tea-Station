var _a;
import { CartController } from "./Controller/CartController.js";
import { HomeController } from "./Controller/HomeController.js";
import { ProductController } from "./Controller/ProductController.js";
import { ProductDetailController } from "./Controller/ProductDetailController.js";
import { CheckoutController } from "./Controller/CheckoutController.js";
import { RegisterController } from "./Controller/RegisterController.js";
import { LoginController } from "./Controller/LoginController.js";
import { UserService } from "./service/UserService.js";
import { Navbar } from "./Views/Navbar.js";
import { ProfileController } from "./Controller/ProfileController.js";
let controller;
let page = location.pathname;
let user;
user = new UserService().getLoginState();
document.querySelector("#header").innerHTML = new Navbar().render(user);
document.querySelector("#footer").innerHTML = new Navbar().renderFooter();
initPlugins();
function initPlugins() {
    $(".navbar").hidescroll();
}
(_a = document.querySelector("#logout-link")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    new UserService().clearLoginState();
    location.href = "index.html";
});
switch (page) {
    case `/`:
    case `/index.html`:
        controller = new HomeController();
        break;
    case `/Views/products.html`:
        controller = new ProductController();
        break;
    case `/Views/productDetail.html`:
        controller = new ProductDetailController();
        break;
    case `/Views/cart.html`:
        controller = new CartController();
        break;
    case `/Views/checkout.html`:
        controller = new CheckoutController();
        break;
    case `/Views/register.html`:
        controller = new RegisterController();
        break;
    case `/Views/login.html`:
        controller = new LoginController();
        break;
    case `/Views/profile.html`:
        controller = new ProfileController();
        break;
    default:
        controller = new HomeController();
        break;
}
controller === null || controller === void 0 ? void 0 : controller.init();
//# sourceMappingURL=app.js.map