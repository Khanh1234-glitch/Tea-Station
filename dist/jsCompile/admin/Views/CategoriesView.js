export class CategoriesAdminView {
    constructor() {
        this.tableBody = document.querySelector("tbody");
    }
    render(categories) {
        this.tableBody.innerHTML = categories
            .map((c) => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-4 font-semibold">${c.id}</td>

                <td>
                    <input 
                        type="text"
                        value="${c.name}"
                        data-id="${c.id}"
                        class="category-name px-3 py-1 text-sm border rounded"
                    />
                </td>

                <td>
                    ${c.productsCount > 0
            ? `<span class="px-2 py-1 text-xs bg-gray-100 rounded">${c.slug}</span>`
            : `<input 
                                type="text"
                                value="${c.slug}"
                                data-id="${c.id}"
                                class="category-slug px-3 py-1 text-sm border rounded"
                           />`}
                </td>

                <td>${c.productsCount}</td>

                <td>
                    <span class="px-2 py-1 text-xs rounded ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}">
                        ${c.status}
                    </span>
                </td>

                <td class="space-x-2 text-center">
                    <button data-id="${c.id}" class="save-btn text-blue-600">
                        Lưu
                    </button>
                    <button data-id="${c.id}" class="delete-btn text-red-500">
                        ${c.productsCount > 0 ? "Khóa" : "Xóa"}
                    </button>
                </td>
            </tr>
        `)
            .join("");
    }
}
//# sourceMappingURL=CategoriesView.js.map