export class About {
    id: string;
    type: string;
    background: string;
    overlay: string;
    watermark: string;
    heading: Heading;
    content: string[];

    constructor(id: string, type: string, background: string, overlay: string, watermark: string, heading: Heading, content: string[]) {
        this.id = id;
        this.type = type;
        this.background = background;
        this.overlay = overlay;
        this.watermark = watermark;
        this.heading = heading;
        this.content = content;
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
