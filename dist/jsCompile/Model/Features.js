export class FeatureItem {
    constructor(id, title, description, image, animation, delay) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.animation = animation;
        this.delay = delay;
    }
}
export class Feature {
    constructor(id, type, subTitle, title, item) {
        this.id = id;
        this.type = type;
        this.subTitle = subTitle;
        this.title = title;
        this.item = item;
    }
}
//# sourceMappingURL=Features.js.map