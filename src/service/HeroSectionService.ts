import { Badge, Cta, HeroSection } from "../Model/HeroSection.js";
import { ApiService } from "./ApiService.js";

export class HeroSectionService extends ApiService {
    async getAll(): Promise<HeroSection> {
        const data = await this.get<HeroSection>("/heroSection");
        const badge = new Badge(data.badge.prefix, data.badge.highlight, data.badge.suffix);
        const cta = new Cta(data.cta.text, data.cta.link);
        return new HeroSection(data.id, data.type, data.image, badge, data.title, data.description, cta);
    }
}
