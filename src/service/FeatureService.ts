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
    }
}
