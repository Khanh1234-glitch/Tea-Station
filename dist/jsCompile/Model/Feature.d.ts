import type { FeatureItem } from "./FeaturesItem.js";
export declare class Feature {
    id: string;
    type: string;
    heading: Heading;
    items: FeatureItem[];
    constructor(id: string, type: string, heading: Heading, items: FeatureItem[]);
}
export declare class Heading {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string);
}
//# sourceMappingURL=Feature.d.ts.map