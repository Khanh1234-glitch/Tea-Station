<<<<<<< HEAD
import { Feature, Heading } from "../Model/Feature.js";
import { FeatureItem } from "../Model/FeaturesItem.js";
import { ApiService } from "./ApiService.js";

export class FeatureService extends ApiService {
    async getAll(): Promise<Feature> {
        const data = await this.get<Feature>("/features");
        const items = data.items.map((f: FeatureItem) => new FeatureItem(f.id, f.title, f.description, f.image, f.aos, f.position));
        const heading = new Heading(data.heading.subTitle, data.heading.title);
        return new Feature(data.id, data.type, heading, items);
=======
import { ApiService } from "./ApiService.js";
import { Feature, Heading, Item, Aos } from "../Model/Features.js";

export class FeatureService extends ApiService {
    async getFeature(): Promise<Feature> {
        const data: any = await this.getOne("/features");

        return new Feature(
            data.id,
            data.type,
            new Heading(data.heading.subTitle, data.heading.title),
            data.items.map(
                (item: any) =>
                    new Item(item.id, item.title, item.description, item.image, new Aos(item.aos.animation, item.aos.delay), item.position),
            ),
        );
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
