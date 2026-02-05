import { PartnerLogo } from "../Model/PartnerLogo.js";
import { ApiService } from "./ApiService.js";
export class PartnerLogoService extends ApiService {
    async getAll() {
        const data = await this.get("/partnerLogos");
        return data.map((p) => new PartnerLogo(p.id, p.fileName, p.alt));
    }
}
//# sourceMappingURL=PartnerLogoService.js.map