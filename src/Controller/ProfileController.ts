import type { Order } from "../Model/Order.js";
import type { User } from "../Model/User.js";
import { OrderService } from "../service/OrderService.js";
import { UserService } from "../service/UserService.js";
import { ProfileView } from "../Views/ProfileView.js";

export class ProfileController {
    private view = new ProfileView();
    private userService = UserService.getIntance();
    private orderService = new OrderService();
    async init() {
        const user = this.userService.getLoginState();
        if (!user) {
            alert("Vui long dang nhap");
            window.location.href = "index.html";
            return;
        }
        const orders = await this.orderService.getOrdersByUser(user.id!);
        const orderCount = orders.length;
        this.renderView(user, orderCount, orders);
        this.bindUpdate(user);
        this.bindChangePassword(user);
    }
    renderView(user: User, orderCount: number, orders: Order[]) {
        const container = document.querySelector("#profile");
        const containerAvatar = document.querySelector("#avatar");
        const containerOrderHistory = document.querySelector("#orders");
        const containerChangePassword = document.querySelector("#password");
        if (!container || !containerAvatar || !containerOrderHistory) return;
        container.innerHTML = this.view.renderInfo(user);
        containerAvatar.innerHTML = this.view.renderAvatar(user, orderCount);
        containerOrderHistory!.innerHTML = this.view.renderOrderHistory(orders);
        containerChangePassword!.innerHTML = this.view.renderChangePassword();
    }
    private bindUpdate(user: User): void {
        const form = document.querySelector("form");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = (form.querySelector("input[type='text']") as HTMLInputElement).value;
            const email = (form.querySelector("input[type='email']") as HTMLInputElement).value;
            const phoneInputs = form.querySelectorAll("input[type='text']");
            const phone = (phoneInputs[1] as HTMLInputElement).value;
            const address = (phoneInputs[2] as HTMLInputElement).value;

            try {
                const updatedUser = await this.userService.update(user.id!, {
                    ...user,
                    name,
                    email,
                    phone,
                    address,
                });

                this.userService.saveLoginState(updatedUser);

                alert("Cập nhật thành công!");
            } catch (error) {
                console.error(error);
                alert("Có lỗi xảy ra");
            }
        });
    }
    private bindChangePassword(user: User): void {
        const form = document.querySelector("#ChangePassWordForm");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const currentPassword = (document.querySelector("#currentPassword") as HTMLInputElement).value;

            const newPassword = (document.querySelector("#newPassword") as HTMLInputElement).value;

            const confirmPassword = (document.querySelector("#confirmPassword") as HTMLInputElement).value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }

            if (currentPassword !== user.password) {
                alert("Mật khẩu hiện tại không đúng");
                return;
            }

            if (newPassword.length < 6) {
                alert("Mật khẩu mới phải ít nhất 6 ký tự");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("Mật khẩu nhập lại không khớp");
                return;
            }
            if (currentPassword === newPassword) {
                alert("Mật khẩu cũ không được trùng với mật khẩu mới");
                return;
            }
            try {
                const updatedUser = await this.userService.update(user.id!, {
                    ...user,
                    password: newPassword,
                });

                this.userService.saveLoginState(updatedUser);

                alert("Đổi mật khẩu thành công");
            } catch (error) {
                console.error(error);
                alert("Có lỗi xảy ra");
            }
        });
    }
}
