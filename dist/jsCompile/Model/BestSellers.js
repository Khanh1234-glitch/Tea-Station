export class BestSeller {
    constructor(id, type, heading, description, products) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.description = description;
        this.products = products;
    }
}
export class HeadingBestSeller {
    constructor(subTitle, title) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
export class ProductBestSeller {
    constructor(id, name, image, description, benefits) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.benefits = benefits;
    }
}
export class Benefits {
    constructor(title, percentage, postion) {
        this.title = title;
        this.percentage = percentage;
        this.position = postion;
    }
}
//# sourceMappingURL=BestSellers.js.map