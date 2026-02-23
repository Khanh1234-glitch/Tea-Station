import { User } from "../Model/User.js";
import { UserService } from "../service/UserService.js";

export class LoginController {
    private userService = UserService.getIntance();
    init() {
        this.attachEvents();
    }
    private validateForm(email: string, password: string): string | null {
        if (!email.trim()) return "Vui lòng nhập email";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Email không đúng định dạng";

        if (!password.trim()) return "Vui lòng nhập mật khẩu";

        return null;
    }
    private attachEvents(): void {
        document.querySelector("#login-form")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            let email: string = (document.querySelector("#email") as HTMLInputElement).value;
            let password: string = (document.querySelector("#password") as HTMLInputElement).value;
            let error = this.validateForm(email, password);
            if (error) {
                alert(error);
                return;
            }
            const user = await this.userService.login(email, password);
            if (!user) {
                alert("Email hoặc mật khẩu không đúng");
                return;
            }
            alert("Đăng nhập thành công");
            this.userService.saveLoginState(user);
            location.href = "index.html";
        });
    }
}
