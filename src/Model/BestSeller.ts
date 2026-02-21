export class BestSeller {
    id: string;
    type: string;
    heading: Heading;
    description: string;
    products: BestSellerProduct[];

    constructor(id: string, type: string, heading: Heading, description: string, products: BestSellerProduct[]) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.description = description;
        this.products = products;
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

export class BestSellerProduct {
    id: string;
    name: string;
    image: string;
    description: string;
    benefits: Benefit[];

    constructor(id: string, name: string, image: string, description: string, benefits: Benefit[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.benefits = benefits;
    }
}

export class Benefit {
    title: string;
    percentage: number;
    position?: string; // optional vì có product không có position

    constructor(title: string, percentage: number, position?: string) {
        this.title = title;
        this.percentage = percentage;
        if (position != undefined) this.position = position;
    }
}
