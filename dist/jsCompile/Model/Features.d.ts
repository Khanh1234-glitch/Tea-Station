export declare class Feature {
    id: string;
    type: string;
    heading: Heading;
    item: Item[];
    constructor(id: string, type: string, heading: Heading, item: Item[]);
}
export declare class Heading {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string);
}
export declare class Item {
    id: string;
    title: string;
    description: string;
    image: string;
    aos: Aos;
    position: string;
    constructor(id: string, title: string, description: string, image: string, aos: Aos, position: string);
}
export declare class Aos {
    animation: string;
    delay: number;
    constructor(animation: string, delay: number);
}
//# sourceMappingURL=Features.d.ts.map