export class CategoriesAdminView {
    constructor() {
        const el = document.querySelector("#categories-table-body");
        if (!el) {
            throw new Error("categories-table-body not found");
        }
        this.tableBody = el;
    }
    render(categories) {
        this.tableBody.innerHTML = categories
            .map((c) => `
            <tr data-id="${c.id}" class="border-b ${c.status === "inactive" ? "opacity-50" : ""}">
                <td class="p-4 font-semibold">${c.id}</td>

                <td>
                    <input 
                        type="text"
                        value="${c.name}"
                        data-id="${c.id}"
                        class="category-name px-3 py-1 border rounded"
                        ${c.status === "inactive" ? "disabled" : ""}
                    />
                </td>

                <td>
                    ${c.productsCount > 0
            ? `<span class="px-2 py-1 bg-gray-100 rounded">${c.slug}</span>`
            : `<input 
                                type="text"
                                value="${c.slug}"
                                data-id="${c.id}"
                                class="category-slug px-3 py-1 border rounded"
                                ${c.status === "inactive" ? "disabled" : ""}
                           />`}
                </td>

                <td>
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        ${c.productsCount}
                    </span>
                </td>

                <td>
                    <span class="px-2 py-1 rounded ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}">
                        ${c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                </td>

                <td class="space-x-2 text-center">
    <button 
        data-id="${c.id}" 
        class="save-btn text-blue-600"
        ${c.status === "inactive" ? "disabled" : ""}
    >
        Lưu
    </button>

    ${c.productsCount > 0
            ? `
                <button 
                    data-id="${c.id}" 
                    class="toggle-btn ${c.status === "active" ? "text-red-500" : "text-green-600"}"
                >
                    ${c.status === "active" ? "Khóa" : "Mở"}
                </button>
              `
            : `
                <button 
                    data-id="${c.id}" 
                    class="delete-btn text-red-500"
                >
                    Xóa
                </button>
              `}
</td>
            </tr>
        `)
            .join("");
    }
}
//# sourceMappingURL=CategoriesAdminView.js.map