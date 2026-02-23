import { User } from "../Model/User.js";
import { UserService } from "../service/UserService.js";
export class RegisterController {
    constructor() {
        this.userService = UserService.getIntance();
    }
    init() {
        this.attachEvents();
    }
    validateForm(name, email, password, rePassword) {
        if (!name.trim())
            return "Vui lòng nhập họ tên";
        if (!email.trim())
            return "Vui lòng nhập email";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Email không đúng định dạng";
        if (password.length < 6)
            return "Mật khẩu phải ít nhất 6 ký tự";
        if (password !== rePassword)
            return "Mật khẩu nhập lại không khớp";
        return null;
    }
    attachEvents() {
        var _a;
        (_a = document.querySelector("#register-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", async (e) => {
            e.preventDefault();
            let name = document.querySelector("#name").value;
            let email = document.querySelector("#email").value;
            let phone = document.querySelector("#phone").value;
            let password = document.querySelector("#password").value;
            let rePassword = document.querySelector("#re-password").value;
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
            }
            catch (err) {
                console.error(err);
                alert("Có lỗi xảy ra");
            }
        });
    }
}
//# sourceMappingURL=RegisterController.js.map