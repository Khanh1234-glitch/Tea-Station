import { ProductListService } from "../../service/ProductListService.js";
import { ProductVariantAdminView } from "../Views/ProductVariantAdminView.js";
import { ProductVariantAdminService } from "../Services/ProductVariantService.js";
export class ProductVariantAdminController {
    constructor() {
        this.service = new ProductVariantAdminService();
        this.productService = new ProductListService();
        this.view = new ProductVariantAdminView();
        this.variants = [];
        this.productMap = new Map();
    }
    async init() {
        await this.loadProducts();
        await this.loadVariants();
        this.renderProductSelect();
        this.attachEvents();
        this.attachCreateEvent();
    }
    attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target;
            // 🔥 Lấy id từ button
            const id = target.dataset.id;
            if (!id)
                return;
            const variant = this.variants.find((v) => v.id === id);
            if (!variant)
                return;
            // ================= SAVE =================
            if (target.classList.contains("save-btn")) {
                const sizeInput = document.querySelector(`.variant-size[data-id="${id}"]`);
                const extraInput = document.querySelector(`.variant-extra[data-id="${id}"]`);
                const priceInput = document.querySelector(`.variant-price[data-id="${id}"]`);
                const stockInput = document.querySelector(`.variant-stock[data-id="${id}"]`);
                if (!sizeInput || !extraInput || !priceInput || !stockInput)
                    return;
                await this.service.update(id, {
                    size: sizeInput.value,
                    extra_price: Number(extraInput.value),
                    price: Number(priceInput.value),
                    stock: Number(stockInput.value),
                });
                await this.loadVariants();
                return;
            }
            // ================= TOGGLE =================
            if (target.classList.contains("toggle-btn")) {
                const newStatus = variant.status === "inactive" ? "active" : "inactive";
                await this.service.update(id, {
                    status: newStatus,
                });
                await this.loadVariants();
                return;
            }
        });
    }
    async loadProducts() {
        const products = await this.productService.getAll();
        this.productMap.clear();
        products.forEach((p) => {
            this.productMap.set(p.id, p.name);
        });
    }
    async loadVariants() {
        this.variants = await this.service.getAll();
        this.view.render(this.variants, this.productMap);
    }
    renderProductSelect() {
        const select = document.querySelector("#variant-product");
        select.innerHTML = `
            <option value="">Chọn sản phẩm</option>
            ${[...this.productMap.entries()].map(([id, name]) => `<option value="${id}">${name}</option>`).join("")}
        `;
    }
    attachCreateEvent() {
        const addBtn = document.querySelector("#add-variant-btn");
        addBtn.addEventListener("click", async () => {
            const product_id = document.querySelector("#variant-product").value;
            const size = document.querySelector("#variant-size").value;
            const extra_price = Number(document.querySelector("#variant-extra").value);
            const price = Number(document.querySelector("#variant-price").value);
            const stock = Number(document.querySelector("#variant-stock").value);
            if (!product_id || !size) {
                alert("Thiếu dữ liệu");
                return;
            }
            await this.service.create({
                product_id, // 🔥 GIỜ SẼ TRÙNG productsList.id
                size,
                extra_price,
                price,
                stock,
                status: "active",
            });
            await this.loadVariants();
        });
    }
}
//# sourceMappingURL=ProductVariantAdminController.js.map