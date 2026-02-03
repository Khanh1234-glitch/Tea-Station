export class HeroSection {
    constructor(id, type, image, badge, title, description, cta) {
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
    constructor(prefix, highlight, suffix) {
        this.prefix = prefix;
        this.highlight = highlight;
        this.suffix = suffix;
    }
}
export class Cta {
    constructor(text, link) {
        this.text = text;
        this.link = link;
    }
}
//# sourceMappingURL=HeroSection.js.map