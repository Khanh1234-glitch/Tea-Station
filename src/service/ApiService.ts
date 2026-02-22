export class ApiService {
    protected baseUrl: string = `http://localhost:3000`;
    async get<T>(endpoint: string): Promise<T> {
        try {
            let res: Response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!res.ok) {
                throw new Error(`Loi lay du lieu`);
            }
            return await res.json();
        } catch (error) {
            console.error("Cos loi xay ra", error);
            throw error;
        }
    }
    async getOne<T>(endpoint: string): Promise<T> {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok) throw new Error("Loi lay du lieu");

        return await res.json(); // KHÔNG ép thành array
    }
}
