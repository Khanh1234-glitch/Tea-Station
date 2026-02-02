export declare class BestSeller {
    id: string;
    type: string;
    heading: HeadingBestSeller;
    description: string;
    products: ProductBestSeller[];
    constructor(id: string, type: string, heading: HeadingBestSeller, description: string, products: ProductBestSeller[]);
}
export declare class HeadingBestSeller {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string);
}
export declare class ProductBestSeller {
    id: string;
    name: string;
    image: string;
    description: string;
    benefits: Benefits[];
    constructor(id: string, name: string, image: string, description: string, benefits: Benefits[]);
}
export declare class Benefits {
    title: string;
    percentage: number;
    position: string;
    constructor(title: string, percentage: number, postion: string);
}
//# sourceMappingURL=BestSellers.d.ts.map