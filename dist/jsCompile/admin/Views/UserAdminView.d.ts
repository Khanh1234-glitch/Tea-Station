import { User, UserRole } from "../../Model/User.js";
export declare class UsersAdminView {
    private tableBody;
    constructor();
    private validateForm;
    renderCreateRoleOptions(roles: UserRole[]): void;
    render(users: User[], roles: UserRole[]): void;
    onToggleStatus(callback: (id: string, status: string) => void): void;
    onChangeRole(callback: (id: string, roleId: string) => void): void;
    onCreate(callback: (data: Partial<User>) => void): void;
}
//# sourceMappingURL=UserAdminView.d.ts.map