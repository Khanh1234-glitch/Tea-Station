import { RolesAdminService } from "../Services/RolesAdminService.js";
import { UsersAdminService } from "../Services/UsersAdminService.js";
import { RolesAdminView } from "../Views/RoleAdminView.js";

import { AdminController } from "./AdminController.js";

export class RolesAdminController extends AdminController {
    private roleService = new RolesAdminService();
    private userService = new UsersAdminService();
    private view = new RolesAdminView();

    async init() {
        await this.loadRoles();
        this.bindEvents();
    }

    private async loadRoles() {
        const roles = await this.roleService.getAll();
        const users = await this.userService.getAll();
        this.view.render(roles, users);
    }

    private bindEvents() {
        // Create
        this.view.onCreate(async (name) => {
            await this.roleService.create({ name });
            await this.loadRoles();
        });

        // Delete (có kiểm tra user)
        this.view.onDelete(async (id) => {
            const users = await this.userService.getAll();

            const isUsed = users.some((user) => user.roleId === id);

            if (isUsed) {
                alert("Role này đang được sử dụng, không thể xóa.");
                return;
            }

            if (!confirm("Bạn có chắc muốn xóa role này?")) {
                return;
            }

            await this.roleService.deleteRole(id);
            await this.loadRoles();
        });
    }
}
