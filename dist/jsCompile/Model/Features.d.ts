export declare class FeatureItem {
    id: string;
    title: string;
    description: string;
    image: string;
    animation: string;
    delay: number;
    constructor(id: string, title: string, description: string, image: string, animation: string, delay: number);
}
export declare class Feature {
    id: string;
    type: string;
    subTitle: string;
    title: string;
    item: FeatureItem[];
    constructor(id: string, type: string, subTitle: string, title: string, item: FeatureItem[]);
}
//# sourceMappingURL=Features.d.ts.map