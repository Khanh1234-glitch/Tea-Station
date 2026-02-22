export declare class BestSeller {
    id: string;
    type: string;
    heading: Heading;
    description: string;
    products: BestSellerProduct[];
    constructor(id: string, type: string, heading: Heading, description: string, products: BestSellerProduct[]);
}
export declare class Heading {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string);
}
export declare class BestSellerProduct {
    id: string;
    name: string;
    image: string;
    description: string;
    benefits: Benefit[];
    constructor(id: string, name: string, image: string, description: string, benefits: Benefit[]);
}
export declare class Benefit {
    title: string;
    percentage: number;
    position?: string;
    constructor(title: string, percentage: number, position?: string);
}
//# sourceMappingURL=BestSeller.d.ts.map