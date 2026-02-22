import { pageProducts } from "../Model/PageProduct.js";
import { ApiService } from "./ApiService.js";
export class PageProductService extends ApiService {
    async getAll() {
        const data = await this.get("/pageProducts");
        return data.map((p) => new pageProducts(p.id, p.slug, p.banner, p.subtitle, p.title, p.description));
    }
}
//# sourceMappingURL=PageProductService.js.map