import { ProductAdminService } from "../Services/ProductAdminService.js";
import { ProductAttributeAdminService } from "../Services/ProductAttributeAdminService.js";
import { ProductAttributeAdminView } from "../Views/ProductAttributeAdminView.js";
import type { ProductAttributeAdmin } from "../Model/ProductAttributeAdmin.js";
import { ProductListService } from "../../service/ProductListService.js";

export class ProductAttributeAdminController {
    private service = new ProductAttributeAdminService();
    private productService = new ProductListService();
    private view = new ProductAttributeAdminView();

    private attributes: ProductAttributeAdmin[] = [];
    private productMap = new Map<string, string>();

    public async init() {
        await this.loadProducts();
        await this.loadAttributes();
        this.renderProductSelect();
        this.attachEvents();
        this.attachCreateEvent();
    }

    private async loadProducts() {
        const products = await this.productService.getAll();

        products.forEach((p) => {
            this.productMap.set(p.id, p.name);
        });
    }

    private async loadAttributes() {
        this.attributes = await this.service.getAll();
        this.view.render(this.attributes, this.productMap);
    }

    private renderProductSelect() {
        const select = document.querySelector("#attribute-product") as HTMLSelectElement;

        select.innerHTML = `
        <option value="">Chọn sản phẩm</option>
        ${[...this.productMap.entries()].map(([id, name]) => `<option value="${id}">${name}</option>`).join("")}
        `;
    }

    private attachCreateEvent() {
        const btn = document.querySelector("#save-attribute-btn");

        btn?.addEventListener("click", async () => {
            const product_id = (document.querySelector("#attribute-product") as HTMLSelectElement).value;
            const origin = (document.querySelector("#attribute-origin") as HTMLInputElement).value;
            const brew_guide = (document.querySelector("#attribute-brew") as HTMLInputElement).value;
            const shelf_life = (document.querySelector("#attribute-shelf") as HTMLInputElement).value;
            const storage = (document.querySelector("#attribute-storage") as HTMLInputElement).value;

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
            } else {
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

    private attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id;
            if (!id) return;

            if (target.classList.contains("save-btn")) {
                const origin = (document.querySelector(`.attr-origin[data-id="${id}"]`) as HTMLInputElement).value;
                const brew = (document.querySelector(`.attr-brew[data-id="${id}"]`) as HTMLInputElement).value;
                const shelf = (document.querySelector(`.attr-shelf[data-id="${id}"]`) as HTMLInputElement).value;
                const storage = (document.querySelector(`.attr-storage[data-id="${id}"]`) as HTMLInputElement).value;

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
