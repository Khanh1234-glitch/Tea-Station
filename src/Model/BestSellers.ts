export class BestSeller {
    id: string;
    type: string;
    heading: HeadingBestSeller;
    description: string;
    products: ProductBestSeller[];
    constructor(id: string, type: string, heading: HeadingBestSeller, description: string, products: ProductBestSeller[]) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.description = description;
        this.products = products;
    }
}

export class HeadingBestSeller {
    subTitle: string;
    title: string;
    constructor(subTitle: string, title: string) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
export class ProductBestSeller {
    id: string;
    name: string;
    image: string;
    description: string;
    benefits: Benefits[];
    constructor(id: string, name: string, image: string, description: string, benefits: Benefits[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.benefits = benefits;
    }
}
export class Benefits {
    title: string;
    percentage: number;
    position: string;
    constructor(title: string, percentage: number, postion: string) {
        this.title = title;
        this.percentage = percentage;
        this.position = postion;
    }
}
