// admin/Views/ProductListAdminView.ts
import type { ProductList } from "../../Model/ProductList.js";

export class ProductListAdminView {
    private tableBody = document.querySelector("#product-list-table-body") as HTMLElement;

    render(products: ProductList[]) {
        this.tableBody.innerHTML = products
            .map(
                (p) => `
        <tr class="border-b hover:bg-gray-50 ${p.status === "inactive" ? "opacity-50" : ""}">
            <td class="p-4 font-semibold">${p.id}</td>

            <td>
                <input type="text"
                    value="${p.name}"
                    data-id="${p.id}"
                    class="product-name w-40 px-2 py-1 border rounded" />
            </td>

            <td>${p.categoryId}</td>

            <td>
                <input type="number"
                    value="${p.basePrice}"
                    data-id="${p.id}"
                    class="product-price w-24 px-2 py-1 border rounded" />
            </td>

            <td>${p.stock}</td>

            <td>
                <span class="px-2 py-1 rounded ${p.status === "inactive" ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"}">
                    ${p.status}
                </span>
            </td>

            <td class="space-x-2 text-center">
                <button data-id="${p.id}" class="save-btn text-blue-600">
                    Lưu
                </button>

                <button data-id="${p.id}" class="toggle-btn text-red-500">
                    ${p.status === "inactive" ? "Mở" : "Khóa"}
                </button>
            </td>
        </tr>
        `,
            )
            .join("");
    }
}
