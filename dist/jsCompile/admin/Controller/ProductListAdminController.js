// admin/Controller/ProductListAdminController.ts
import { ProductListAdminService } from "../Services/ProductListAdminService.js";
import { ProductListAdminView } from "../Views/ProductListAdminView.js";
export class ProductListAdminController {
    constructor() {
        this.service = new ProductListAdminService();
        this.view = new ProductListAdminView();
        this.products = [];
    }
    async init() {
        await this.loadProducts();
        this.attachEvents();
        this.attachCreateEvent();
        this.initImagePreview();
    }
    async loadProducts() {
        this.products = await this.service.getAll();
        this.view.render(this.products);
    }
    initImagePreview() {
        const thumbnailInput = document.querySelector("#thumbnail-input");
        const thumbnailPreview = document.querySelector("#thumbnail-preview");
        const galleryInput = document.querySelector("#gallery-input");
        const galleryPreview = document.querySelector("#gallery-preview");
        // Thumbnail preview
        thumbnailInput === null || thumbnailInput === void 0 ? void 0 : thumbnailInput.addEventListener("change", () => {
            var _a;
            const file = (_a = thumbnailInput.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file)
                return;
            const fakePath = "../../public/assets/products/" + file.name;
            thumbnailPreview.src = fakePath;
            thumbnailPreview.classList.remove("hidden");
        });
        // Gallery preview
        galleryInput === null || galleryInput === void 0 ? void 0 : galleryInput.addEventListener("change", () => {
            galleryPreview.innerHTML = "";
            if (!galleryInput.files)
                return;
            Array.from(galleryInput.files).forEach((file) => {
                const fakePath = "../../public/assets/products/" + file.name;
                const wrapper = document.createElement("div");
                wrapper.className = "relative";
                wrapper.innerHTML = `
                <img src="${fakePath}"
                     class="object-cover w-24 h-24 border rounded-lg" />
            `;
                galleryPreview.appendChild(wrapper);
            });
        });
    }
    attachCreateEvent() {
        const btn = document.querySelector("#save-product-btn");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", async () => {
            var _a;
            const name = document.querySelector("#product-name").value;
            const slug = document.querySelector("#product-slug").value;
            const categoryId = document.querySelector("#product-category").value;
            const basePrice = Number(document.querySelector("#product-basePrice").value);
            const unit = document.querySelector("#product-unit").value;
            const stock = Number(document.querySelector("#product-stock").value);
            const description = document.querySelector("#product-description").value;
            const thumbnailInput = document.querySelector("#thumbnail-input");
            const galleryInput = document.querySelector("#gallery-input");
            let image = "";
            let images = [];
            // Thumbnail
            if ((_a = thumbnailInput.files) === null || _a === void 0 ? void 0 : _a[0]) {
                image = "products/" + thumbnailInput.files[0].name;
            }
            // Gallery
            if (galleryInput.files) {
                images = Array.from(galleryInput.files).map((file) => "products/" + file.name);
            }
            if (!name || !slug || !categoryId) {
                alert("Thiếu dữ liệu");
                return;
            }
            const newProduct = {
                name,
                slug,
                categoryId,
                basePrice,
                unit,
                stock,
                description,
                image,
                images,
                sizes: [],
                variants: [],
                origin: "",
                brewGuide: { tea: "", water: "", temperature: "" },
                expiry: "",
                storage: "",
                status: "active",
            };
            await this.service.create(newProduct);
            alert("Đã thêm sản phẩm");
            await this.loadProducts();
            this.resetForm();
        });
    }
    resetForm() {
        document.querySelector("#product-name").value = "";
        document.querySelector("#product-slug").value = "";
        document.querySelector("#product-basePrice").value = "";
        document.querySelector("#product-unit").value = "";
        document.querySelector("#product-stock").value = "";
        document.querySelector("#product-description").value = "";
    }
    attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target;
            const id = target.dataset.id;
            if (!id)
                return;
            const product = this.products.find((p) => p.id === id);
            if (!product)
                return;
            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.product-name[data-id="${id}"]`);
                const priceInput = document.querySelector(`.product-price[data-id="${id}"]`);
                await this.service.update(id, {
                    name: nameInput.value,
                    basePrice: Number(priceInput.value),
                });
                await this.loadProducts();
            }
            // TOGGLE STATUS
            if (target.classList.contains("toggle-btn")) {
                const newStatus = product.status === "inactive" ? "active" : "inactive";
                await this.service.update(id, {
                    status: newStatus,
                });
                await this.loadProducts();
            }
        });
    }
}
//# sourceMappingURL=ProductListAdminController.js.map