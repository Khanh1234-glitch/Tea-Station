export class Feature {
    id: string;
    type: string;
    heading: Heading;
    item: Item[];
    constructor(id: string, type: string, heading: Heading, item: Item[]) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.item = item;
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
export class Item {
    id: string;
    title: string;
    description: string;
    image: string;
    aos: Aos;
    position: string;
    constructor(id: string, title: string, description: string, image: string, aos: Aos, position: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.aos = aos;
        this.position = position;
    }
}
export class Aos {
    animation: string;
    delay: number;
    constructor(animation: string, delay: number) {
        this.animation = animation;
        this.delay = delay;
    }
}
