import { ApiService } from "./ApiService.js";
import { SiteStat } from "../Model/SiteStat.js";

export class SiteStatService extends ApiService {
    async getSiteStat(): Promise<SiteStat> {
        const data: SiteStat = await this.getOne("/site_stats");

        return new SiteStat(data.products, data.customers, data.rating);
    }
}
