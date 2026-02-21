export class BestSeller {
    constructor(id, type, heading, description, products) {
        this.id = id;
        this.type = type;
        this.heading = heading;
        this.description = description;
        this.products = products;
    }
}
export class Heading {
    constructor(subTitle, title) {
        this.subTitle = subTitle;
        this.title = title;
    }
}
export class BestSellerProduct {
    constructor(id, name, image, description, benefits) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.benefits = benefits;
    }
}
export class Benefit {
    constructor(title, percentage, position) {
        this.title = title;
        this.percentage = percentage;
        if (position != undefined)
            this.position = position;
    }
}
//# sourceMappingURL=BestSeller.js.map