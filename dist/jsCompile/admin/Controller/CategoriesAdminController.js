import { ProductService } from "../../service/ProductService.js";
import { CategoriesAdminService } from "../Services/CategoriesAdminService.js";
import { CategoriesAdminView } from "../Views/CategoriesAdminView.js";
export class CategoriesAdminController {
    constructor() {
        this.service = new CategoriesAdminService();
        this.productService = new ProductService();
        this.view = new CategoriesAdminView();
        this.categories = [];
    }
    async init() {
        await this.loadCategories();
        this.attachEvents();
        this.attachCreateEvent();
    }
    attachCreateEvent() {
        const addBtn = document.querySelector("#add-category-btn");
        const nameInput = document.querySelector("#category-name");
        const slugInput = document.querySelector("#category-slug");
        if (!addBtn || !nameInput || !slugInput)
            return;
        addBtn.addEventListener("click", async () => {
            const name = nameInput.value.trim();
            const slug = slugInput.value.trim();
            if (!name || !slug) {
                alert("Vui lòng nhập đầy đủ");
                return;
            }
            await this.service.create({ name, slug });
            nameInput.value = "";
            slugInput.value = "";
            await this.loadCategories();
        });
    }
    async loadCategories() {
        const categories = await this.service.getAll();
        const products = await this.productService.getAll(); // gọi products
        this.categories = categories.map((c) => {
            var _a;
            return (Object.assign(Object.assign({}, c), { status: (_a = c.status) !== null && _a !== void 0 ? _a : "active", productsCount: products.filter((p) => p.category_id === c.id).length }));
        });
        this.view.render(this.categories);
    }
    attachEvents() {
        document.addEventListener("click", async (e) => {
            const target = e.target;
            const id = target.dataset.id;
            if (!id)
                return;
            const category = this.categories.find((c) => c.id === id);
            if (!category)
                return;
            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.category-name[data-id="${id}"]`);
                if (category.productsCount > 0) {
                    await this.service.update(id, {
                        name: nameInput.value,
                    });
                }
                else {
                    const slugInput = document.querySelector(`.category-slug[data-id="${id}"]`);
                    await this.service.update(id, {
                        name: nameInput.value,
                        slug: slugInput.value,
                    });
                }
                await this.loadCategories();
            }
            // TOGGLE STATUS (Khóa / Mở)
            if (target.classList.contains("toggle-btn")) {
                const newStatus = category.status === "active" ? "inactive" : "active";
                await this.service.update(id, {
                    status: newStatus,
                });
                await this.loadCategories();
            }
            // DELETE (chỉ khi không có sản phẩm)
            if (target.classList.contains("delete-btn")) {
                const confirmDelete = confirm("Bạn chắc chắn muốn xóa?");
                if (!confirmDelete)
                    return;
                await this.service.deleteCate(id);
                await this.loadCategories();
            }
        });
    }
}
//# sourceMappingURL=CategoriesAdminController.js.map