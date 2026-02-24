import type { User, UserRole } from "../../Model/User.js";
export declare class RolesAdminView {
    private tableBody;
    constructor();
    render(roles: UserRole[], users: User[]): void;
    onCreate(callback: (name: string) => void): void;
    onSave(callback: (id: string, name: string) => void): void;
    onDelete(callback: (id: string) => void): void;
}
//# sourceMappingURL=RoleAdminView.d.ts.map