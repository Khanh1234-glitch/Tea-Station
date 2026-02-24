import { User } from "../Model/User.js";
import { UserService } from "../service/UserService.js";
export class LoginController {
    constructor() {
        this.userService = UserService.getIntance();
    }
    init() {
        this.attachEvents();
    }
    validateForm(email, password) {
        if (!email.trim())
            return "Vui lòng nhập email";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Email không đúng định dạng";
        if (!password.trim())
            return "Vui lòng nhập mật khẩu";
        return null;
    }
    attachEvents() {
        var _a;
        (_a = document.querySelector("#login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", async (e) => {
            e.preventDefault();
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value;
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
            if (user.status === "inactive") {
                alert("Tài khoản này đã bị khóa");
                return;
            }
            this.userService.saveLoginState(user);
            if (user.roleId === "1") {
                return (window.location.href = "/Views/admin/dashboard.html");
            }
            alert("Đăng nhập thành công");
            this.userService.saveLoginState(user);
            location.href = "index.html";
        });
    }
}
//# sourceMappingURL=LoginController.js.map