export class ProductVariantAdminView {
    constructor() {
        this.tableBody = document.querySelector("#variant-table-body");
    }
    render(variants, productMap) {
        this.tableBody.innerHTML = variants
            .map((v) => {
            var _a, _b;
            return `
                <tr class="border-b hover:bg-gray-50 ${v.status === "inactive" ? "opacity-50" : ""}">
                    <td class="p-4 font-semibold">${v.id}</td>

                    <td>${(_a = productMap.get(v.product_id)) !== null && _a !== void 0 ? _a : "Unknown"}</td>

                    <td>
                        <input type="text"
                            value="${v.size}"
                            data-id="${v.id}"
                            class="variant-size w-20 px-2 py-1 border rounded" />
                    </td>

                    <td>
                        <input type="number"
                            value="${v.extra_price}"
                            data-id="${v.id}"
                            class="variant-extra w-24 px-2 py-1 border rounded" />
                    </td>

                    <td>
                        <input type="number"
                            value="${v.price}"
                            data-id="${v.id}"
                            class="variant-price w-24 px-2 py-1 border rounded" />
                    </td>

                    <td>
                        <input type="number"
                            value="${v.stock}"
                            data-id="${v.id}"
                            class="variant-stock w-20 px-2 py-1 border rounded" />
                    </td>

                    <td>
                        <span class="px-2 py-1 rounded ${v.status === "inactive" ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"}">
                            ${(_b = v.status) !== null && _b !== void 0 ? _b : "active"}
                        </span>
                    </td>

                    <td class="space-x-2 text-center">
                        <button data-id="${v.id}" class="save-btn text-blue-600">
                            Lưu
                        </button>

                        <button data-id="${v.id}" class="toggle-btn text-red-500">
                            ${v.status === "inactive" ? "Mở" : "Khóa"}
                        </button>
                    </td>
                </tr>
            `;
        })
            .join("");
    }
}
//# sourceMappingURL=ProductVariantAdminView.js.map