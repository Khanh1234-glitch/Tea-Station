import { CategoriesAdminService } from "../Services/CategoriesAdminService.js";
import { ProductAdminService } from "../Services/ProductAdminService.js";
import { ProductAdminView } from "../Views/ProductAdminView.js";
export class ProductAdminController {
    constructor() {
        this.service = new ProductAdminService();
        this.view = new ProductAdminView();
        this.products = [];
        this.categoryService = new CategoriesAdminService();
        this.categories = [];
    }
    async init() {
        await this.loadProducts();
        this.attachEvents();
        this.attachCreateEvent();
        this.loadCategories();
    }
    async loadCategories() {
        this.categories = await this.categoryService.getAll();
        const select = document.querySelector("#product-category");
        select.innerHTML = `
        <option value="">Chọn Category</option>
        ${this.categories
            .filter((c) => c.status !== "inactive") // không hiển thị category bị khóa
            .map((c) => `
                <option value="${c.id}">
                    ${c.name}
                </option>
            `)
            .join("")}
    `;
    }
    slugify(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "");
    }
    resetForm(nameInput, slugInput, categorySelect, priceInput, imageInput, featuredInput, shortDescInput, descInput, preview) {
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
    async loadProducts() {
        this.products = await this.service.getAll();
        this.view.render(this.products);
    }
    attachCreateEvent() {
        const addBtn = document.querySelector("#add-product-btn");
        const nameInput = document.querySelector("#product-name");
        const slugInput = document.querySelector("#product-slug");
        const categorySelect = document.querySelector("#product-category");
        const priceInput = document.querySelector("#product-base-price");
        const imageInput = document.querySelector("#product-image");
        const featuredInput = document.querySelector("#product-featured");
        const shortDescInput = document.querySelector("#product-short-desc");
        const descInput = document.querySelector("#product-description");
        const preview = document.querySelector("#product-image-preview");
        // Auto slug
        nameInput.addEventListener("input", () => {
            slugInput.value = this.slugify(nameInput.value);
        });
        // Preview image
        imageInput.addEventListener("change", () => {
            var _a;
            const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file)
                return;
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        });
        // Add product
        addBtn.addEventListener("click", async () => {
            var _a;
            const name = nameInput.value.trim();
            const slug = slugInput.value.trim();
            const category_id = categorySelect.value;
            const base_price = Number(priceInput.value);
            const featured = featuredInput.checked;
            const short_desc = shortDescInput.value.trim();
            const description = descInput.value.trim();
            const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
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
    attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target;
            const id = target.dataset.id;
            if (!id)
                return;
            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.product-name[data-id="${id}"]`);
                const slugInput = document.querySelector(`.product-slug[data-id="${id}"]`);
                const priceInput = document.querySelector(`.product-price[data-id="${id}"]`);
                const featuredInput = document.querySelector(`.product-featured[data-id="${id}"]`);
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
                if (!confirmDelete)
                    return;
                await this.service.delete(id);
                await this.loadProducts();
            }
        });
    }
}
//# sourceMappingURL=ProductAdminController.js.map