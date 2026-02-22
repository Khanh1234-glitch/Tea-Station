import { ApiService } from "./ApiService.js";
import { About, Heading } from "../Model/About.js";

export class AboutService extends ApiService {
    async getAbout(): Promise<About> {
        const data: About = await this.getOne("/about");

        return new About(
            data.id,
            data.type,
            data.background,
            data.overlay,
            data.watermark,
            new Heading(data.heading.subTitle, data.heading.title),
            data.content,
        );
    }
}
