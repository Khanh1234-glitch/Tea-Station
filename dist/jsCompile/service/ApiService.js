export class ApiService {
    constructor() {
        this.baseUrl = `http://localhost:3001`;
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
}
//# sourceMappingURL=ApiService.js.map