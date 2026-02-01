import { HomeController } from "./Controller/HomeController.js";
let controller;
let page = location.pathname;
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
controller === null || controller === void 0 ? void 0 : controller.init();
//# sourceMappingURL=app.js.map