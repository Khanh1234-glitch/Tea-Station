export class UserRole {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
export class User {
    constructor(id, roleId, name, email, password, address, status, phone, createdAt = new Date().toISOString()) {
        this.createdAt = new Date().toISOString();
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
//# sourceMappingURL=User.js.map