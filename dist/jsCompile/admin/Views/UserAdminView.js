import { User, UserRole } from "../../Model/User.js";
export class UsersAdminView {
    constructor() {
        const table = document.querySelector("#table_user");
        if (!table) {
            throw new Error("Không tìm thấy #table_user");
        }
        this.tableBody = table;
    }
    // ===========================
    // VALIDATION
    // ===========================
    validateForm(name, email, password) {
        if (!name.trim())
            return "Vui lòng nhập họ tên";
        if (!email.trim())
            return "Vui lòng nhập email";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Email không đúng định dạng";
        if (password.length < 6)
            return "Mật khẩu phải ít nhất 6 ký tự";
        return null;
    }
    // ===========================
    // RENDER TABLE
    // ===========================
    renderCreateRoleOptions(roles) {
        const select = document.querySelector(".create-role-select");
        select.innerHTML = roles
            .map((role) => `
        <option value="${role.id}">
            ${role.name}
        </option>
    `)
            .join("");
    }
    render(users, roles) {
        this.tableBody.innerHTML = users
            .map((user) => {
            var _a;
            return `
            <tr class="border-b text-center hover:bg-gray-50">
                <td class="p-4 font-medium">${user.id}</td>
                <td class="p-4 font-medium">${user.name}</td>
                <td>${user.email}</td>
                <td>${(_a = user.phone) !== null && _a !== void 0 ? _a : ""}</td>

                <td>
                    <select 
                        data-id="${user.id}"
                        class="role-select px-2 py-1 text-sm border border-gray-300 rounded">
                        
                        ${roles
                .map((role) => `
                            <option value="${role.id}"
                                ${user.roleId === role.id ? "selected" : ""}>
                                ${role.name}
                            </option>
                        `)
                .join("")}

                    </select>
                </td>

                <td>
                    <span class="px-2 py-1 rounded ${user.status === "inactive" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}">
                        ${user.status}
                    </span>
                </td>

                <td class="space-x-2 text-center">
                    <button 
                        data-id="${user.id}" 
                        data-status="${user.status}"
                        class="lock-btn text-sm text-red-500 hover:underline">
                        ${user.status === "inactive" ? "Mở khóa" : "Khóa"}
                    </button>
                </td>
            </tr>
        `;
        })
            .join("");
    }
    // ===========================
    // TOGGLE STATUS
    // ===========================
    onToggleStatus(callback) {
        this.tableBody.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("lock-btn")) {
                const id = target.dataset.id;
                const status = target.dataset.status;
                callback(id, status);
            }
        });
    }
    // ===========================
    // CHANGE ROLE
    // ===========================
    onChangeRole(callback) {
        this.tableBody.addEventListener("change", (e) => {
            const target = e.target;
            if (target.classList.contains("role-select")) {
                const id = target.dataset.id;
                const roleId = target.value;
                callback(id, roleId);
            }
        });
    }
    // ===========================
    // CREATE USER
    // ===========================
    onCreate(callback) {
        const button = document.querySelector(".add-user-btn");
        if (!button)
            return;
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const nameInput = document.querySelector("input[placeholder='Họ và tên']");
            const emailInput = document.querySelector("input[type='email']");
            const passwordInput = document.querySelector("input[type='password']");
            const phoneInput = document.querySelector("input[placeholder='Số điện thoại']");
            const addressInput = document.querySelector("input[placeholder='Địa chỉ']");
            const roleSelect = document.querySelector(".create-role-select");
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const phone = phoneInput.value.trim();
            const address = addressInput.value.trim();
            const roleId = roleSelect.value;
            const error = this.validateForm(name, email, password);
            if (error) {
                alert(error);
                return;
            }
            callback({
                name,
                email,
                password,
                phone,
                address,
                roleId,
                status: "active",
            });
            // reset form
            nameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
            phoneInput.value = "";
            addressInput.value = "";
            roleSelect.selectedIndex = 0;
        });
    }
}
//# sourceMappingURL=UserAdminView.js.map