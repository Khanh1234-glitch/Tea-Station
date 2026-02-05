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
    variants: Variants[];
    origin: string;
    brewGuide: BrewGuide;
    expiry: string;
    storage: string;
    stock: number;
    status: string;
    constructor(id: string, name: string, image: string, description: string, categoryId: string, slug: string, images: string[], basePrice: number, unit: string, sizes: Size[], variants: Variants[], origin: string, brewGuide: BrewGuide, expiry: string, storage: string, stock: number, status: string);
}
export declare class Size {
    id: string;
    label: string;
    price: number;
    constructor(id: string, label: string, price: number);
}
export declare class BrewGuide {
    tea: string;
    water: string;
    temperature: string;
    constructor(tea: string, water: string, temperature: string);
}
export declare class Variants {
    id: string;
    label: string;
    constructor(id: string, label: string);
}
//# sourceMappingURL=ProductList.d.ts.map