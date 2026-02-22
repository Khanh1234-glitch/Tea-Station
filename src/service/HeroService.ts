import { Hero } from "../Model/Hero.js";
import { ApiService } from "./ApiService.js";

export class HeroService extends ApiService {
    async getAll(): Promise<Hero> {
        const data: Hero = await this.getOne<Hero>(`/hero`);
        return new Hero(data.type, data.src, data.text, data.image);
    }
}
