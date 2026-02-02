export class Hero {
    type: "image" | "video";
    src: string;
    text: string;
    image: string;
    constructor(type: "image" | "video", src: string, text: string, image: string) {
        this.type = type;
        this.src = src;
        this.text = text;
        this.image = image;
    }
}
