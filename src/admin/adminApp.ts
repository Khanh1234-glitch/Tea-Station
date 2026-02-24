import { CategoriesAdminController } from "./Controller/CategoriesAdminController.js";
import { ProductAdminController } from "./Controller/ProductAdminController.js";
import { ProductVariantAdminController } from "./Controller/ProductVariantAdminController.js";
import { RolesAdminController } from "./Controller/RoleAdminController.js";
import { UsersAdminController } from "./Controller/UserAdminController.js";

let page = location.pathname;
let controller;
if (page.includes("users.html")) {
    controller = new UsersAdminController();
}
if (page.includes("roles.html")) {
    controller = new RolesAdminController();
}
if (page.includes("categories.html")) {
    controller = new CategoriesAdminController();
}
if (page.includes("products.html")) {
    controller = new ProductAdminController();
}
if (page.includes("product-variants.html")) {
    controller = new ProductVariantAdminController();
}
controller?.init();
