export type Status = "active" | "inactive";
export declare class UserRole {
    id: string | undefined;
    name: string;
    constructor(id: string | undefined, name: string);
}
export declare class User {
    id: string | undefined;
    roleId: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    status: Status;
    phone?: string;
    createdAt?: string;
    constructor(id: string | undefined, roleId: string, name: string, email: string, password: string, address: string, status: Status, phone?: string, createdAt?: string);
}
//# sourceMappingURL=User.d.ts.map