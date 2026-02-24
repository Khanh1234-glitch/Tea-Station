import type { ProductAdmin } from "../Model/ProductAdmin.js";

export class ProductAdminView {
    private tableBody: HTMLElement;

    constructor() {
        const el = document.querySelector("#products-table-body");
        if (!el) throw new Error("products-table-body not found");
        this.tableBody = el as HTMLElement;
    }

    public render(products: ProductAdmin[]): void {
        this.tableBody.innerHTML = products
            .map(
                (p) => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-4 font-semibold">${p.id}</td>

                <td>
                    <input 
                        type="text"
                        value="${p.name}"
                        data-id="${p.id}"
                        class="product-name w-40 px-2 py-1 border rounded"
                    />
                </td>

                <td>
                    <input 
                        type="text"
                        value="${p.slug}"
                        data-id="${p.id}"
                        class="product-slug w-40 px-2 py-1 border rounded"
                    />
                </td>

                <td>${p.category_id}</td>

                <td>
                    <input 
                        type="number"
                        value="${p.base_price}"
                        data-id="${p.id}"
                        class="product-price w-24 px-2 py-1 border rounded"
                    />
                </td>

                <td>
                    <img 
                        src="../../public/assets/${p.image}"
                        class="w-12 h-12 rounded object-cover"
                    />
                </td>

                <td class="text-center">
                    <input 
                        type="checkbox"
                        data-id="${p.id}"
                        class="product-featured"
                        ${p.featured ? "checked" : ""}
                    />
                </td>

                <td>
                    <span class="px-2 py-1 text-green-700 bg-green-100 rounded">
                        Active
                    </span>
                </td>

                <td class="space-x-2 text-center">
                    <button data-id="${p.id}" class="save-btn text-blue-600">
                        Lưu
                    </button>
                    <button data-id="${p.id}" class="delete-btn text-red-500">
                        Xóa
                    </button>
                </td>
            </tr>
        `,
            )
            .join("");
    }
}
