export declare class HeroSection {
    id: string;
    type: string;
    image: string;
    badge: Badge;
    title: string;
    description: string;
    cta: Cta;
    constructor(id: string, type: string, image: string, badge: Badge, title: string, description: string, cta: Cta);
}
export declare class Badge {
    prefix: string;
    highlight: string;
    suffix: string;
    constructor(prefix: string, highlight: string, suffix: string);
}
export declare class Cta {
    text: string;
    link: string;
    constructor(text: string, link: string);
}
//# sourceMappingURL=HeroSection.d.ts.map