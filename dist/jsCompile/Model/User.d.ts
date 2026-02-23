export type UserRole = "admin" | "customer";
export declare class User {
    id: string | undefined;
    role: UserRole;
    name: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
    createdAt?: string;
    constructor(id: string | undefined, role: UserRole, name: string, email: string, password: string, address: string, phone?: string, createdAt?: string);
}
//# sourceMappingURL=User.d.ts.map