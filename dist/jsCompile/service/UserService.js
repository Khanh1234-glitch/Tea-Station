import { User } from "../Model/User.js";
import { ApiService } from "./ApiService.js";
export class UserService extends ApiService {
    static getIntance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async create(user) {
        const data = await this.post("/users", user);
        return new User(data.id, data.roleId, data.name, data.email, data.password, data.address || "", data.status, data.phone, data.createdAt);
    }
    async checkEmailValid(email) {
        const data = await this.get(`/users?email=${email}`);
        return data.length === 0;
    }
    async login(email, password) {
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);
        const data = await this.get(`/users?email=${encodedEmail}&password=${encodedPassword}`);
        if (data.length === 0) {
            return null;
        }
        const user = data[0];
        if (!(user === null || user === void 0 ? void 0 : user.roleId)) {
            throw new Error("User role is missing");
        }
        return new User(user.id, user.roleId, user.name, user.email, user.password, user.address || "", user.status, user.phone, user.createdAt);
    }
    saveLoginState(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    clearLoginState() {
        localStorage.removeItem("user");
    }
    getLoginState() {
        let userString = localStorage.getItem(`user`);
        if (localStorage.getItem("user")) {
            let user = JSON.parse(userString);
            return new User(user.id, user.roleId, user.name, user.email, user.password, user.phone || "", user.status, user.phone, user.createdAt);
        }
        return false;
    }
    async update(id, user) {
        const data = await this.put(`/users/${id}`, user);
        return data;
    }
}
//# sourceMappingURL=UserService.js.map