export type Status = "active" | "inactive";
export class UserRole {
    id: string | undefined;
    name: string;
    constructor(id: string | undefined, name: string) {
        this.id = id;
        this.name = name;
    }
}
export class User {
    id: string | undefined;
    roleId: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    status: Status;
    phone?: string;
    createdAt?: string = new Date().toISOString();

    constructor(
        id: string | undefined,
        roleId: string,
        name: string,
        email: string,
        password: string,
        address: string,
        status: Status,
        phone?: string,
        createdAt: string = new Date().toISOString(),
    ) {
        this.id = id;
        this.roleId = roleId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address || "";
        this.status = status;
        this.phone = phone || "";
        this.createdAt = createdAt || "";
    }
}
