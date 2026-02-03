import { About, Heading } from "../Model/About.js";
import { ApiService } from "./ApiService.js";
export class AboutService extends ApiService {
    async getAll() {
        const data = await this.get("/about");
        const heading = new Heading(data.heading.subTitle, data.heading.title);
        return new About(data.id, data.type, data.background, data.overlay, data.watermark, heading, data.content);
    }
}
//# sourceMappingURL=AboutService.js.map