export class ApiService {
    constructor() {
        this.baseUrl = `http://localhost:3000`;
    }
    async get(endpoint) {
        try {
            let res = await fetch(`${this.baseUrl}${endpoint}`);
            if (!res.ok) {
                throw new Error(`Loi lay du lieu`);
            }
            return await res.json();
        }
        catch (error) {
            console.error("Cos loi xay ra", error);
            throw error;
        }
    }
    async getOne(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok)
            throw new Error("Loi lay du lieu");
        return await res.json(); // KHÔNG ép thành array
    }
}
//# sourceMappingURL=ApiService.js.map