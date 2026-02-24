export class CategoryAdmin {
    id: string;
    name: string;
    slug: string;
    status: "active" | "inactive";
    productsCount: number;
    constructor(id: string, name: string, slug: string, status: "active", productsCounts: number) {
        ((this.id = id), (this.name = name));
        this.slug = slug;
        this.status = status;
        this.productsCount = productsCounts;
    }
}
