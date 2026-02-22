export class About {
    id: string;
    type: string;
    background: string;
    overlay: string;
    watermark: string;
    heading: Heading;
    content: string[];
<<<<<<< HEAD
=======

>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
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
<<<<<<< HEAD
export class Heading {
    subTitle: string;
    title: string;
=======

export class Heading {
    subTitle: string;
    title: string;

>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    constructor(subTitle: string, title: string) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
