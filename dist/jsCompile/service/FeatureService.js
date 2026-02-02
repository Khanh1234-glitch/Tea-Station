import { Feature, Heading } from "../Model/Feature.js";
import { FeatureItem } from "../Model/FeaturesItem.js";
import { ApiService } from "./ApiService.js";
export class FeatureService extends ApiService {
    async getAll() {
        const data = await this.get("/features");
        const items = data.items.map((f) => new FeatureItem(f.id, f.title, f.description, f.image, f.aos, f.position));
        const heading = new Heading(data.heading.subTitle, data.heading.title);
        return new Feature(data.id, data.type, heading, items);
    }
}
//# sourceMappingURL=FeatureService.js.map