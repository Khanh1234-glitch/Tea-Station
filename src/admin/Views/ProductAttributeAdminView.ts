import type { ProductAttributeAdmin } from "../Model/ProductAttributeAdmin.js";

export class ProductAttributeAdminView {
    private tableBody = document.querySelector("#attribute-table-body") as HTMLElement;

    render(attributes: ProductAttributeAdmin[], productMap: Map<string, string>) {
        this.tableBody.innerHTML = attributes
            .map(
                (a) => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-4 font-semibold">
                ${productMap.get(a.product_id) ?? "Unknown"}
            </td>

            <td>
                <input type="text"
                    value="${a.origin}"
                    data-id="${a.id}"
                  
                    class="attr-origin px-2 py-1 border rounded w-40" />
            </td>

            <td>
                <input type="text"
                    value="${a.brew_guide}"
                    data-id="${a.id}"
                    
                    class="attr-brew px-2 py-1 border rounded w-52" />
            </td>

            <td>
                <input type="text"
                    value="${a.shelf_life}"
                    data-id="${a.id}"
                   
                    class="attr-shelf px-2 py-1 border rounded w-32" />
            </td>

            <td>
                <input type="text"
                    value="${a.storage}"
                    data-id="${a.id}"
                    id="attribute-storage"
                    class="attr-storage px-2 py-1 border rounded w-52" />
            </td>

            <td class="text-center">
                <button data-id="${a.id}" id="save-attribute-btn" class="save-btn text-blue-600">
                    Lưu
                </button>
            </td>
        </tr>
        `,
            )
            .join("");
    }
}
