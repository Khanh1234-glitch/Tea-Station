import { siteStat } from "../Model/siteStats.js";
import { ApiService } from "./ApiService.js";
export class SiteStatService extends ApiService {
    async getAll() {
        const data = await this.get("/site_stats");
        return new siteStat(data.products, data.customers, data.rating);
    }
}
//# sourceMappingURL=SiteStatService.js.map