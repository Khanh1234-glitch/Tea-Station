export type UserRole = "admin" | "customer";

export class User {
    id: string | undefined;
    role: UserRole;
    name: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
    createdAt?: string = new Date().toISOString();

    constructor(
        id: string | undefined,
        role: UserRole,
        name: string,
        email: string,
        password: string,
        address: string,
        phone?: string,
        createdAt: string = new Date().toISOString(),
    ) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address || "";
        this.phone = phone || "";
        this.createdAt = createdAt || "";
    }
}
