export class Category {
    id: string;
    name: string;
    slug: string;
    status: "active" | "inactive";
    createdAt?: string = new Date().toISOString();
    constructor(id: string, name: string, slug: string, status: "active", createdAt: string = new Date().toISOString()) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.status = status;
        this.createdAt = createdAt || "";
    }
}
