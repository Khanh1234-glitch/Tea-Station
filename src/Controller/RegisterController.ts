import { User } from "../Model/User.js";
import { UserService } from "../service/UserService.js";

export class RegisterController {
    private userService = UserService.getIntance();
    init() {
        this.attachEvents();
    }
    private validateForm(name: string, email: string, password: string, rePassword: string): string | null {
        if (!name.trim()) return "Vui lòng nhập họ tên";

        if (!email.trim()) return "Vui lòng nhập email";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Email không đúng định dạng";

        if (password.length < 6) return "Mật khẩu phải ít nhất 6 ký tự";

        if (password !== rePassword) return "Mật khẩu nhập lại không khớp";

        return null;
    }
    private attachEvents(): void {
        document.querySelector("#register-form")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            let name: string = (document.querySelector("#name") as HTMLInputElement).value;
            let email: string = (document.querySelector("#email") as HTMLInputElement).value;
            let phone: string = (document.querySelector("#phone") as HTMLInputElement).value;
            let password: string = (document.querySelector("#password") as HTMLInputElement).value;
            let rePassword: string = (document.querySelector("#re-password") as HTMLInputElement).value;
            const error = this.validateForm(name, email, password, rePassword);
            if (error) {
                alert(error);
                return;
            }
            try {
                const isAvailable = await this.userService.checkEmailValid(email);

                if (!isAvailable) {
                    alert("Email đã tồn tại");
                    return;
                }
                await this.userService.create(new User(undefined, "customer", name, email, password, "", phone));
                console.log("User created");
                alert("Đăng ký thành công");
                location.href = "login.html";
            } catch (err) {
                console.error(err);
                alert("Có lỗi xảy ra");
            }
        });
    }
}
