import { CategoriesAdminController } from "./Controller/CategoriesAdminController.js";
import { DashboardController } from "./Controller/DashboardController.js";
import { ProductAdminController } from "./Controller/ProductAdminController.js";
import { ProductAttributeAdminController } from "./Controller/ProductAttributeAdminController.js";
import { ProductListAdminController } from "./Controller/ProductListAdminController.js";
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
if (page.includes("product-attributes.html")) {
    controller = new ProductAttributeAdminController();
}
if (page.includes("products-list.html")) {
    controller = new ProductListAdminController();
}
if (page.includes("dashboard.html")) {
    controller = new DashboardController();
}
controller?.init();
