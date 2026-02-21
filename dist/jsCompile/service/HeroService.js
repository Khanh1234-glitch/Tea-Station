import { Hero } from "../Model/Hero.js";
import { ApiService } from "./ApiService.js";
export class HeroService extends ApiService {
    async getAll() {
        const data = await this.getOne(`/hero`);
        return new Hero(data.type, data.src, data.text, data.image);
    }
}
//# sourceMappingURL=HeroService.js.map