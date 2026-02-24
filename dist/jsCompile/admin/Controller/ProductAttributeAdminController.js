import { ProductAdminService } from "../Services/ProductAdminService.js";
import { ProductAttributeAdminService } from "../Services/ProductAttributeAdminService.js";
import { ProductAttributeAdminView } from "../Views/ProductAttributeAdminView.js";
import { ProductListService } from "../../service/ProductListService.js";
export class ProductAttributeAdminController {
    constructor() {
        this.service = new ProductAttributeAdminService();
        this.productService = new ProductListService();
        this.view = new ProductAttributeAdminView();
        this.attributes = [];
        this.productMap = new Map();
    }
    async init() {
        await this.loadProducts();
        await this.loadAttributes();
        this.renderProductSelect();
        this.attachEvents();
        this.attachCreateEvent();
    }
    async loadProducts() {
        const products = await this.productService.getAll();
        products.forEach((p) => {
            this.productMap.set(p.id, p.name);
        });
    }
    async loadAttributes() {
        this.attributes = await this.service.getAll();
        this.view.render(this.attributes, this.productMap);
    }
    renderProductSelect() {
        const select = document.querySelector("#attribute-product");
        select.innerHTML = `
        <option value="">Chọn sản phẩm</option>
        ${[...this.productMap.entries()].map(([id, name]) => `<option value="${id}">${name}</option>`).join("")}
        `;
    }
    attachCreateEvent() {
        const btn = document.querySelector("#save-attribute-btn");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", async () => {
            const product_id = document.querySelector("#attribute-product").value;
            const origin = document.querySelector("#attribute-origin").value;
            const brew_guide = document.querySelector("#attribute-brew").value;
            const shelf_life = document.querySelector("#attribute-shelf").value;
            const storage = document.querySelector("#attribute-storage").value;
            if (!product_id) {
                alert("Chọn sản phẩm");
                return;
            }
            console.log("Selected product_id:", product_id);
            console.log("All attributes:", this.attributes);
            // Nếu đã tồn tại → update
            const existed = this.attributes.find((a) => String(a.product_id) === String(product_id));
            if (existed) {
                await this.service.update(existed.id, {
                    origin,
                    brew_guide,
                    shelf_life,
                    storage,
                });
            }
            else {
                await this.service.create({
                    product_id,
                    origin,
                    brew_guide,
                    shelf_life,
                    storage,
                });
            }
            await this.loadAttributes();
        });
    }
    attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target;
            const id = target.dataset.id;
            if (!id)
                return;
            if (target.classList.contains("save-btn")) {
                const origin = document.querySelector(`.attr-origin[data-id="${id}"]`).value;
                const brew = document.querySelector(`.attr-brew[data-id="${id}"]`).value;
                const shelf = document.querySelector(`.attr-shelf[data-id="${id}"]`).value;
                const storage = document.querySelector(`.attr-storage[data-id="${id}"]`).value;
                await this.service.update(id, {
                    origin,
                    brew_guide: brew,
                    shelf_life: shelf,
                    storage,
                });
                await this.loadAttributes();
            }
        });
    }
}
//# sourceMappingURL=ProductAttributeAdminController.js.map