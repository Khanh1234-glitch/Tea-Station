// admin/Controller/ProductListAdminController.ts
import { ProductListAdminService } from "../Services/ProductListAdminService.js";
import { ProductListAdminView } from "../Views/ProductListAdminView.js";
import type { ProductList } from "../../Model/ProductList.js";

export class ProductListAdminController {
    private service = new ProductListAdminService();
    private view = new ProductListAdminView();
    private products: ProductList[] = [];

    public async init() {
        await this.loadProducts();
        this.attachEvents();
        this.attachCreateEvent();
        this.initImagePreview();
    }

    private async loadProducts() {
        this.products = await this.service.getAll();
        this.view.render(this.products);
    }
    private initImagePreview() {
        const thumbnailInput = document.querySelector("#thumbnail-input") as HTMLInputElement;
        const thumbnailPreview = document.querySelector("#thumbnail-preview") as HTMLImageElement;

        const galleryInput = document.querySelector("#gallery-input") as HTMLInputElement;
        const galleryPreview = document.querySelector("#gallery-preview") as HTMLElement;

        // Thumbnail preview
        thumbnailInput?.addEventListener("change", () => {
            const file = thumbnailInput.files?.[0];
            if (!file) return;

            const fakePath = "../../public/assets/products/" + file.name;

            thumbnailPreview.src = fakePath;
            thumbnailPreview.classList.remove("hidden");
        });

        // Gallery preview
        galleryInput?.addEventListener("change", () => {
            galleryPreview.innerHTML = "";

            if (!galleryInput.files) return;

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
    private attachCreateEvent() {
        const btn = document.querySelector("#save-product-btn");

        btn?.addEventListener("click", async () => {
            const name = (document.querySelector("#product-name") as HTMLInputElement).value;
            const slug = (document.querySelector("#product-slug") as HTMLInputElement).value;
            const categoryId = (document.querySelector("#product-category") as HTMLSelectElement).value;
            const basePrice = Number((document.querySelector("#product-basePrice") as HTMLInputElement).value);
            const unit = (document.querySelector("#product-unit") as HTMLInputElement).value;
            const stock = Number((document.querySelector("#product-stock") as HTMLInputElement).value);
            const description = (document.querySelector("#product-description") as HTMLTextAreaElement).value;
            const thumbnailInput = document.querySelector("#thumbnail-input") as HTMLInputElement;
            const galleryInput = document.querySelector("#gallery-input") as HTMLInputElement;
            let image = "";
            let images: string[] = [];

            // Thumbnail
            if (thumbnailInput.files?.[0]) {
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
    private resetForm() {
        (document.querySelector("#product-name") as HTMLInputElement).value = "";
        (document.querySelector("#product-slug") as HTMLInputElement).value = "";
        (document.querySelector("#product-basePrice") as HTMLInputElement).value = "";
        (document.querySelector("#product-unit") as HTMLInputElement).value = "";
        (document.querySelector("#product-stock") as HTMLInputElement).value = "";
        (document.querySelector("#product-description") as HTMLTextAreaElement).value = "";
    }
    private attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id;
            if (!id) return;

            const product = this.products.find((p) => p.id === id);
            if (!product) return;

            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.product-name[data-id="${id}"]`) as HTMLInputElement;

                const priceInput = document.querySelector(`.product-price[data-id="${id}"]`) as HTMLInputElement;

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
