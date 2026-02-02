import { Feature, Heading } from "../Model/Feature.js";
import { FeatureItem } from "../Model/FeaturesItem.js";
import { ApiService } from "./ApiService.js";

export class FeatureService extends ApiService {
    async getAll(): Promise<Feature> {
        const data = await this.get<Feature>("/features");
        const items = data.items.map((f: FeatureItem) => new FeatureItem(f.id, f.title, f.description, f.image, f.aos, f.position));
        const heading = new Heading(data.heading.subTitle, data.heading.title);
        return new Feature(data.id, data.type, heading, items);
    }
}
