export declare class ProductList {
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
    constructor(id: string, name: string, image: string, description: string, categoryId: string, slug: string, images: string[], basePrice: number, unit: string, sizes: Size[], variants: string[], origin: string, brewGuide: BrewGuide, expiry: string, storage: string, stock: number, status: string);
}
export declare class Size {
    label: string;
    price: number;
    constructor(label: string, price: number);
}
export declare class BrewGuide {
    tea: string;
    water: string;
    temperature: string;
    constructor(tea: string, water: string, temperature: string);
}
//# sourceMappingURL=ProductList.d.ts.map