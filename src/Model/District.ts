import type { Ward } from "./Ward.js";

export class District {
    code: string;
    name: string;
    wards: Ward[];
    constructor(code: string, name: string, wards: Ward[]) {
        this.code = code;
        this.name = name;
        this.wards = wards;
    }
}
