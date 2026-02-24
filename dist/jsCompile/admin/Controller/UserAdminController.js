import { RolesAdminService } from "../Services/RolesAdminService.js";
import { UsersAdminService } from "../Services/UsersAdminService.js";
import { UsersAdminView } from "../Views/UserAdminView.js";
import { AdminController } from "./AdminController.js";
export class UsersAdminController extends AdminController {
    constructor() {
        super(...arguments);
        this.userService = new UsersAdminService();
        this.roleService = new RolesAdminService();
        this.view = new UsersAdminView();
    }
    async init() {
        await this.loadData();
        this.bindEvents();
    }
    // ===========================
    // LOAD USERS + ROLES
    // ===========================
    async loadData() {
        const users = await this.userService.getAll();
        const roles = await this.roleService.getAll();
        this.view.render(users, roles);
        this.view.renderCreateRoleOptions(roles);
    }
    // ===========================
    // EVENTS
    // ===========================
    bindEvents() {
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
//# sourceMappingURL=UserAdminController.js.map