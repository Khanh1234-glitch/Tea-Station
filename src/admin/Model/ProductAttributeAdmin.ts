export class ProductAttributeAdmin {
    id: string;
    product_id: string;
    origin: string;
    brew_guide: string;
    shelf_life: string;
    storage: string;

    constructor(id: string, product_id: string, origin: string, brew_guide: string, shelf_life: string, storage: string) {
        this.id = id;
        this.product_id = product_id;
        this.origin = origin;
        this.brew_guide = brew_guide;
        this.shelf_life = shelf_life;
        this.storage = storage;
    }
}
