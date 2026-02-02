import { Benefits, BestSeller, HeadingBestSeller, ProductBestSeller } from "../Model/BestSellers.js";
import { ApiService } from "./ApiService.js";
export class BestSellerService extends ApiService {
    async getAll() {
        const data = await this.get("/bestSellers");
        const heading = new HeadingBestSeller(data.heading.subTitle, data.heading.title);
        const products = data.products.map((p) => new ProductBestSeller(p.id, p.name, p.image, p.description, p.benefits.map((b) => new Benefits(b.title, b.percentage, b.position))));
        return new BestSeller(data.id, data.type, heading, data.description, products);
    }
}
//# sourceMappingURL=BestSellerService.js.map