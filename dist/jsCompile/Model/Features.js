export class Feature {
    constructor(id, type, heading, item) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.item = item;
    }
}
export class Heading {
    constructor(subTitle, title) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
export class Item {
    constructor(id, title, description, image, aos, position) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.aos = aos;
        this.position = position;
    }
}
export class Aos {
    constructor(animation, delay) {
        this.animation = animation;
        this.delay = delay;
    }
}
//# sourceMappingURL=Features.js.map