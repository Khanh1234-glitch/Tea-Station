import type { District } from "./District.js";

export class City {
    code: string;
    name: string;
    districts: District[];
    constructor(code: string, name: string, districts: District[]) {
        this.code = code;
        this.name = name;
        this.districts = districts;
    }
}
