import { User } from "../Model/User.js";
import { ApiService } from "./ApiService.js";

export class UserService extends ApiService {
    private static instance: UserService;
    static getIntance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async create(user: User): Promise<User> {
        const data = await this.post<User>("/users", user);
        return new User(data.id, data.role, data.name, data.email, data.password, data.address || "", data.phone, data.createdAt);
    }
    async checkEmailValid(email: string): Promise<boolean> {
        const data = await this.get<User[]>(`/users?email=${email}`);
        return data.length === 0;
    }
    async login(email: string, password: string): Promise<User | null> {
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);

        const data = await this.get<User[]>(`/users?email=${encodedEmail}&password=${encodedPassword}`);

        if (data.length === 0) {
            return null;
        }

        const user = data[0];
        if (!user?.role) {
            throw new Error("User role is missing");
        }
        return new User(user.id, user.role, user.name, user.email, user.password, user.address || "", user.phone, user.createdAt);
    }
    saveLoginState(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    clearLoginState(): void {
        localStorage.removeItem("user");
    }

    getLoginState(): User | false {
        let userString: string | null = localStorage.getItem(`user`);
        if (localStorage.getItem("user")) {
            let user: User = JSON.parse(userString!);
            return new User(user.id, user.role, user.name, user.email, user.password, user.address || "", user.phone, user.createdAt);
        }
        return false;
    }
    async update(id: string, user: User): Promise<User> {
        const data = await this.put<User>(`/users/${id}`, user);
        return data;
    }
}
