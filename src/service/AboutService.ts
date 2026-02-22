<<<<<<< HEAD
import { About, Heading } from "../Model/About.js";
import { ApiService } from "./ApiService.js";

export class AboutService extends ApiService {
    async getAll(): Promise<About> {
        const data = await this.get<About>("/about");
        const heading = new Heading(data.heading.subTitle, data.heading.title);
        return new About(data.id, data.type, data.background, data.overlay, data.watermark, heading, data.content);
=======
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
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
