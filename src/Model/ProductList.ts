export class ProductList {
    id: string;
    name: string;
    image: string;
    description: string;
    categoryId: string;
    slug: string;
    images: string[];
    basePrice: number;
    unit: string;
    sizes: Size[];
    variants: string[];
    origin: string;
    brewGuide: BrewGuide;
    expiry: string;
    storage: string;
    stock: number;
    status: string;
    constructor(
        id: string,
        name: string,
        image: string,
        description: string,
        categoryId: string,
        slug: string,
        images: string[],
        basePrice: number,
        unit: string,
        sizes: Size[],
        variants: string[],
        origin: string,
        brewGuide: BrewGuide,
        expiry: string,
        storage: string,
        stock: number,
        status: string,
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.categoryId = categoryId;
        this.slug = slug;
        this.images = images;
        this.basePrice = basePrice;
        this.unit = unit;
        this.sizes = sizes;
        this.variants = variants;
        this.origin = origin;
        this.brewGuide = brewGuide;
        this.expiry = expiry;
        this.storage = storage;
        this.stock = stock;
        this.status = status;
    }
}
export class Size {
    label: string;
    price: number;
    constructor(label: string, price: number) {
        this.label = label;
        this.price = price;
    }
}
export class BrewGuide {
    tea: string;
    water: string;
    temperature: string;
    constructor(tea: string, water: string, temperature: string) {
        this.tea = tea;
        this.water = water;
        this.temperature = temperature;
    }
}
