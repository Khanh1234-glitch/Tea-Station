import { PartnerLogo } from "../Model/PartnerLogo.js";
import { ApiService } from "./ApiService.js";

export class PartnerLogoService extends ApiService {
    async getAllLogo(): Promise<PartnerLogo[]> {
        const data: PartnerLogo[] = await this.get<PartnerLogo[]>("/partnerLogos");
        return data.map((p) => new PartnerLogo(p.id, p.fileName, p.alt));
    }
}
