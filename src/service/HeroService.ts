import { Hero } from "../Model/Hero.js";
import { ApiService } from "./ApiService.js";

export class HeroService extends ApiService {
    async getAll(): Promise<Hero> {
<<<<<<< HEAD
        const data: Hero = await this.get<Hero>("/hero");
=======
        const data: Hero = await this.getOne<Hero>(`/hero`);
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
        return new Hero(data.type, data.src, data.text, data.image);
    }
}
