<<<<<<< HEAD
import { siteStat } from "../Model/siteStats.js";
import { ApiService } from "./ApiService.js";

export class SiteStatService extends ApiService {
    async getAll(): Promise<siteStat> {
        const data: siteStat = await this.get<siteStat>("/site_stats");
        return new siteStat(data.products, data.customers, data.rating);
=======
import { ApiService } from "./ApiService.js";
import { SiteStat } from "../Model/SiteStat.js";

export class SiteStatService extends ApiService {
    async getSiteStat(): Promise<SiteStat> {
        const data: SiteStat = await this.getOne("/site_stats");

        return new SiteStat(data.products, data.customers, data.rating);
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
