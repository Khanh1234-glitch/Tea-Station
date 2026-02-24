export class UsersAdminView {
    constructor() {
        const table = document.querySelector("#table_user");
        if (!table) {
            throw new Error("Không tìm thấy #table_user");
        }
        this.tableBody = table;
        const btn = document.querySelector(".add-user-btn");
        if (btn) {
            this.addButton = btn;
        }
    }
    render(users) {
        this.tableBody.innerHTML = users
            .map((user) => {
            var _a, _b;
            return `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-4 font-medium">${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>

                <td>
                    <select 
                        data-id="${user.id}"
                        class="role-select px-2 py-1 text-sm border border-gray-300 rounded">
                        
                        <option value="customer" ${user.role === "customer" ? "selected" : ""}>
                            customer
                        </option>

                        <option value="admin" ${user.role === "admin" ? "selected" : ""}>
                            admin
                        </option>
                    </select>
                </td>

                <td>
                    <span class="px-2 py-1 rounded 
                        ${user.status === "inactive" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}">
                        ${(_a = user.status) !== null && _a !== void 0 ? _a : "active"}
                    </span>
                </td>

                <td class="space-x-2 text-center">
                    <button 
                        data-id="${user.id}" 
                        data-status="${(_b = user.status) !== null && _b !== void 0 ? _b : "active"}"
                        class="lock-btn text-red-500">
                        ${user.status === "inactive" ? "Mở khóa" : "Khóa"}
                    </button>
                </td>
            </tr>
        `;
        })
            .join("");
    }
    onDelete(callback) {
        this.tableBody.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("delete-btn")) {
                const id = Number(target.dataset.id);
                callback(id);
            }
        });
    }
}
//# sourceMappingURL=UsersAdminView.js.map