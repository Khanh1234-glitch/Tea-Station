import { HomeController } from "./Controller/HomeController.js";
import { ProductController } from "./Controller/ProductController.js";
import { ProductDetailController } from "./Controller/ProductDetailController.js";

let controller;
let page: string = location.pathname;
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
    default:
        controller = new HomeController();
        break;
}
controller?.init();
