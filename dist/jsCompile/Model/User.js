export class User {
    constructor(id, role, name, email, password, address, phone, createdAt = new Date().toISOString()) {
        this.createdAt = new Date().toISOString();
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
//# sourceMappingURL=User.js.map