export class ProductList {
    constructor(id, name, image, description, categoryId, slug, images, basePrice, unit, sizes, variants, origin, brewGuide, expiry, storage, stock, status) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.categoryId = categoryId;
        this.slug = slug;
        this.images = images;
        this.basePrice = basePrice;
        this.unit = unit;
        this.sizes = sizes;
        this.variants = variants;
        this.origin = origin;
        this.brewGuide = brewGuide;
        this.expiry = expiry;
        this.storage = storage;
        this.stock = stock;
        this.status = status;
    }
}
export class Size {
    constructor(label, price) {
        this.label = label;
        this.price = price;
    }
}
export class BrewGuide {
    constructor(tea, water, temperature) {
        this.tea = tea;
        this.water = water;
        this.temperature = temperature;
    }
}
//# sourceMappingURL=ProductList.js.map