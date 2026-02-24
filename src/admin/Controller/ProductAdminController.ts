import type { CategoryAdmin } from "../Model/CategoriesAdmin.js";
import type { ProductAdmin } from "../Model/ProductAdmin.js";
import { CategoriesAdminService } from "../Services/CategoriesAdminService.js";
import { ProductAdminService } from "../Services/ProductAdminService.js";

import { ProductAdminView } from "../Views/ProductAdminView.js";

export class ProductAdminController {
    private service = new ProductAdminService();
    private view = new ProductAdminView();
    private products: ProductAdmin[] = [];
    private categoryService = new CategoriesAdminService();
    private categories: CategoryAdmin[] = [];
    public async init(): Promise<void> {
        await this.loadProducts();
        this.attachEvents();
        this.attachCreateEvent();
        this.loadCategories();
    }
    private async loadCategories(): Promise<void> {
        this.categories = await this.categoryService.getAll();

        const select = document.querySelector("#product-category") as HTMLSelectElement;

        select.innerHTML = `
        <option value="">Chọn Category</option>
        ${this.categories
            .filter((c) => c.status !== "inactive") // không hiển thị category bị khóa
            .map(
                (c) => `
                <option value="${c.id}">
                    ${c.name}
                </option>
            `,
            )
            .join("")}
    `;
    }
    private slugify(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "");
    }

    private resetForm(
        nameInput: HTMLInputElement,
        slugInput: HTMLInputElement,
        categorySelect: HTMLSelectElement,
        priceInput: HTMLInputElement,
        imageInput: HTMLInputElement,
        featuredInput: HTMLInputElement,
        shortDescInput: HTMLTextAreaElement,
        descInput: HTMLTextAreaElement,
        preview: HTMLImageElement,
    ): void {
        nameInput.value = "";
        slugInput.value = "";
        categorySelect.value = "";
        priceInput.value = "";
        imageInput.value = "";
        featuredInput.checked = false;
        shortDescInput.value = "";
        descInput.value = "";

        preview.src = "";
        preview.classList.add("hidden");
    }
    private async loadProducts(): Promise<void> {
        this.products = await this.service.getAll();
        this.view.render(this.products);
    }
    private attachCreateEvent(): void {
        const addBtn = document.querySelector("#add-product-btn") as HTMLButtonElement;

        const nameInput = document.querySelector("#product-name") as HTMLInputElement;
        const slugInput = document.querySelector("#product-slug") as HTMLInputElement;
        const categorySelect = document.querySelector("#product-category") as HTMLSelectElement;
        const priceInput = document.querySelector("#product-base-price") as HTMLInputElement;
        const imageInput = document.querySelector("#product-image") as HTMLInputElement;
        const featuredInput = document.querySelector("#product-featured") as HTMLInputElement;
        const shortDescInput = document.querySelector("#product-short-desc") as HTMLTextAreaElement;
        const descInput = document.querySelector("#product-description") as HTMLTextAreaElement;
        const preview = document.querySelector("#product-image-preview") as HTMLImageElement;

        // Auto slug
        nameInput.addEventListener("input", () => {
            slugInput.value = this.slugify(nameInput.value);
        });

        // Preview image
        imageInput.addEventListener("change", () => {
            const file = imageInput.files?.[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {
                preview.src = reader.result as string;
                preview.classList.remove("hidden");
            };

            reader.readAsDataURL(file);
        });

        // Add product
        addBtn.addEventListener("click", async () => {
            const name = nameInput.value.trim();
            const slug = slugInput.value.trim();
            const category_id = categorySelect.value;
            const base_price = Number(priceInput.value);
            const featured = featuredInput.checked;
            const short_desc = shortDescInput.value.trim();
            const description = descInput.value.trim();
            const file = imageInput.files?.[0];

            if (!name || !slug || !category_id || !base_price) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }

            await this.service.create({
                category_id,
                name,
                slug,
                short_desc,
                description,
                base_price,
                featured,
                image: file ? file.name : "no-image.jpg",
            });

            this.resetForm(nameInput, slugInput, categorySelect, priceInput, imageInput, featuredInput, shortDescInput, descInput, preview);

            await this.loadProducts();
        });
    }
    private attachEvents(): void {
        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id;
            if (!id) return;

            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.product-name[data-id="${id}"]`) as HTMLInputElement;

                const slugInput = document.querySelector(`.product-slug[data-id="${id}"]`) as HTMLInputElement;

                const priceInput = document.querySelector(`.product-price[data-id="${id}"]`) as HTMLInputElement;

                const featuredInput = document.querySelector(`.product-featured[data-id="${id}"]`) as HTMLInputElement;

                await this.service.update(id, {
                    name: nameInput.value,
                    slug: slugInput.value,
                    base_price: Number(priceInput.value),
                    featured: featuredInput.checked,
                });

                await this.loadProducts();
            }

            // DELETE
            if (target.classList.contains("delete-btn")) {
                const confirmDelete = confirm("Bạn chắc chắn muốn xóa?");
                if (!confirmDelete) return;

                await this.service.delete(id);
                await this.loadProducts();
            }
        });
    }
}
