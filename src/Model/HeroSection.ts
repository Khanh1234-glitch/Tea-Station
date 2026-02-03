export class HeroSection {
    id: string;
    type: string;
    image: string;
    badge: Badge;
    title: string;
    description: string;
    cta: Cta;
    constructor(id: string, type: string, image: string, badge: Badge, title: string, description: string, cta: Cta) {
        this.id = id;
        this.type = type;
        this.image = image;
        this.badge = badge;
        this.title = title;
        this.description = description;
        this.cta = cta;
    }
}
export class Badge {
    prefix: string;
    highlight: string;
    suffix: string;
    constructor(prefix: string, highlight: string, suffix: string) {
        this.prefix = prefix;
        this.highlight = highlight;
        this.suffix = suffix;
    }
}
export class Cta {
    text: string;
    link: string;
    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}
