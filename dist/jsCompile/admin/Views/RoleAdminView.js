export class RolesAdminView {
    constructor() {
        const table = document.querySelector("#table_role");
        if (!table)
            throw new Error("Không tìm thấy #table_role");
        this.tableBody = table;
    }
    render(roles, users) {
        this.tableBody.innerHTML = roles
            .map((role) => {
            const userCount = users.filter((u) => u.roleId === role.id).length;
            const isAdmin = role.name === "admin";
            return `
                <tr class="text-center border-b hover:bg-gray-50">
                    <td class="p-4 font-semibold">${role.id}</td>

                  <td class="text-center space-x-2">
                        ${role.name}
                    </td>

                    <td>
                        <span class="px-2 py-1 rounded bg-p-100 text-p-900">
                            ${userCount} Users
                        </span>
                    </td>

                    <td class="text-center space-x-2">
                        ${isAdmin
                ? `<span class="text-gray-400 text-sm">Không thể chỉnh sửa</span>`
                : `
                            <button 
                                data-id="${role.id}"
                                class="save-btn text-blue-600 hover:underline">
                                Lưu
                            </button>

                            <button 
                                data-id="${role.id}"
                                class="delete-btn text-red-500 hover:underline">
                                Xóa
                            </button>
                        `}
                    </td>
                </tr>
            `;
        })
            .join("");
    }
    // ADD
    onCreate(callback) {
        const btn = document.querySelector(".add-role-btn");
        const input = document.querySelector(".role-name-input");
        if (!btn || !input)
            return;
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const name = input.value.trim();
            if (!name) {
                alert("Vui lòng nhập tên role");
                return;
            }
            callback(name);
            input.value = "";
        });
    }
    // SAVE EDIT
    onSave(callback) {
        this.tableBody.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("save-btn")) {
                const id = target.dataset.id;
                const input = this.tableBody.querySelector(`.edit-role-input[data-id="${id}"]`);
                callback(id, input.value.trim());
            }
        });
    }
    // DELETE
    onDelete(callback) {
        this.tableBody.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("delete-btn")) {
                const id = target.dataset.id;
                callback(id);
            }
        });
    }
}
//# sourceMappingURL=RoleAdminView.js.map