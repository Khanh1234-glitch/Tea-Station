import { City } from "../Model/City.js";
import { District } from "../Model/District.js";
import { Ward } from "../Model/Ward.js";
import { ApiService } from "./ApiService.js";

export class AddressService extends ApiService {
    async getAddress(): Promise<City> {
        const data: City = await this.get<City>("/address");
        const districts = data.districts.map((d: District) => {
            const wards = d.wards.map((w: Ward) => new Ward(w.code, w.name));
            return new District(d.code, d.name, wards);
        });
        return new City(data.code, data.name, districts);
    }
}
