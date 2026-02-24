import type { User } from "../../Model/User.js";
export declare class UsersAdminView {
    private tableBody;
    private addButton;
    constructor();
    render(users: User[]): void;
    onDelete(callback: (id: number) => void): void;
}
//# sourceMappingURL=UsersAdminView.d.ts.map