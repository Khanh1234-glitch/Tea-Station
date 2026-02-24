export class ProductAdmin {
    id: string;
    category_id: string;
    name: string;
    slug: string;
    short_desc: string;
    description: string;
    base_price: number;
    featured: boolean;
    image: string;
    constructor(
        id: string,
        category_id: string,
        name: string,
        slug: string,
        short_desc: string,
        description: string,
        base_price: number,
        featured: boolean,
        image: string,
    ) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.slug = slug;
        this.short_desc = short_desc;
        this.description = description;
        this.base_price = base_price;
        this.featured = featured;
        this.image = image;
    }
}
