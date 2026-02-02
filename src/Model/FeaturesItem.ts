export class FeatureItem {
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
