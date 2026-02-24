import { ProductService } from "../../service/ProductService.js";
import type { CategoryAdmin } from "../Model/CategoriesAdmin.js";
import { CategoriesAdminService } from "../Services/CategoriesAdminService.js";
import { CategoriesAdminView } from "../Views/CategoriesAdminView.js";

export class CategoriesAdminController {
    private service = new CategoriesAdminService();
    private productService = new ProductService();
    private view = new CategoriesAdminView();
    private categories: CategoryAdmin[] = [];
    public async init(): Promise<void> {
        await this.loadCategories();
        this.attachEvents();
        this.attachCreateEvent();
    }
    private attachCreateEvent(): void {
        const addBtn = document.querySelector("#add-category-btn") as HTMLButtonElement;
        const nameInput = document.querySelector("#category-name") as HTMLInputElement;
        const slugInput = document.querySelector("#category-slug") as HTMLInputElement;

        if (!addBtn || !nameInput || !slugInput) return;

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
    private async loadCategories(): Promise<void> {
        const categories = await this.service.getAll();
        const products = await this.productService.getAll(); // gọi products

        this.categories = categories.map((c) => ({
            ...c,
            status: c.status ?? "active",
            productsCount: products.filter((p) => p.category_id === c.id).length,
        }));

        this.view.render(this.categories);
    }

    private attachEvents(): void {
        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id as string;
            if (!id) return;

            const category = this.categories.find((c) => c.id === id);
            if (!category) return;

            // SAVE
            if (target.classList.contains("save-btn")) {
                const nameInput = document.querySelector(`.category-name[data-id="${id}"]`) as HTMLInputElement;

                if (category.productsCount > 0) {
                    await this.service.update(id, {
                        name: nameInput.value,
                    });
                } else {
                    const slugInput = document.querySelector(`.category-slug[data-id="${id}"]`) as HTMLInputElement;

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
                if (!confirmDelete) return;

                await this.service.deleteCate(id);
                await this.loadCategories();
            }
        });
    }
}
