import { User } from "../Model/User.js";
import { ApiService } from "./ApiService.js";
export declare class UserService extends ApiService {
    private static instance;
    static getIntance(): UserService;
    create(user: User): Promise<User>;
    checkEmailValid(email: string): Promise<boolean>;
    login(email: string, password: string): Promise<User | null>;
    saveLoginState(user: User): void;
    clearLoginState(): void;
    getLoginState(): User | false;
    update(id: string, user: User): Promise<User>;
}
//# sourceMappingURL=UserService.d.ts.map