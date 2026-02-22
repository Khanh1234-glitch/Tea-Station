import { CartController } from "./Controller/CartController.js";
import { HomeController } from "./Controller/HomeController.js";
import { ProductController } from "./Controller/ProductController.js";
import { ProductDetailController } from "./Controller/ProductDetailController.js";
let controller;
let page = location.pathname;
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
    default:
        controller = new HomeController();
        break;
}
controller === null || controller === void 0 ? void 0 : controller.init();
//# sourceMappingURL=app.js.map