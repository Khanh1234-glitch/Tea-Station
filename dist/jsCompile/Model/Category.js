export class Category {
    constructor(id, name, slug, status, createdAt = new Date().toISOString()) {
        this.createdAt = new Date().toISOString();
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.status = status;
        this.createdAt = createdAt || "";
    }
}
//# sourceMappingURL=Category.js.map