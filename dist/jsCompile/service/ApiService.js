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
    async patch(endpoint, data) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Patch failed");
        return res.json();
    }
    async getOne(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok)
            throw new Error("Loi lay du lieu");
        return await res.json(); // KHÔNG ép thành array
    }
    async post(endpoint, data) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Loi POST du lieu");
        return await res.json();
    }
    async put(endpoint, data) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Update failed");
        return res.json();
    }
    async delete(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Delete failed");
    }
}
//# sourceMappingURL=ApiService.js.map