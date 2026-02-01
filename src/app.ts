import { HomeController } from "./Controller/HomeController.js";

let controller;
let page: string = location.pathname;
switch (page) {
    case `/`:

    case `/index.html`:
        controller = new HomeController();
        break;
    case `/products.html`:

    default:
        controller = new HomeController();
        break;
}
controller?.init();
