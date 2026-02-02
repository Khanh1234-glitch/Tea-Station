import type { FeatureItem } from "./FeaturesItem.js";

export class Feature {
    id: string;
    type: string;
    heading: Heading;
    items: FeatureItem[];
    constructor(id: string, type: string, heading: Heading, items: FeatureItem[]) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.items = items;
    }
}
export class Heading {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
