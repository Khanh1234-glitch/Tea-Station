import { RolesAdminService } from "../Services/RolesAdminService.js";
import { UsersAdminService } from "../Services/UsersAdminService.js";
import { UsersAdminView } from "../Views/UserAdminView.js";
import { AdminController } from "./AdminController.js";

export class UsersAdminController extends AdminController {
    private userService = new UsersAdminService();
    private roleService = new RolesAdminService();
    private view = new UsersAdminView();

    async init() {
        await this.loadData();
        this.bindEvents();
    }

    // ===========================
    // LOAD USERS + ROLES
    // ===========================

    private async loadData() {
        const users = await this.userService.getAll();
        const roles = await this.roleService.getAll();

        this.view.render(users, roles);
        this.view.renderCreateRoleOptions(roles);
    }

    // ===========================
    // EVENTS
    // ===========================

    private bindEvents() {
        // Toggle status
        this.view.onToggleStatus(async (id, status) => {
            await this.userService.toggleStatus(id, status);
            await this.loadData();
        });

        // Change role
        this.view.onChangeRole(async (id, roleId) => {
            await this.userService.update(id, { roleId });
            await this.loadData();
        });

        // Create user
        this.view.onCreate(async (data) => {
            await this.userService.create(data);
            await this.loadData();
        });
    }
}
