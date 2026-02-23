import { User } from "../Model/User.js";
export class ProfileView {
    renderAvatar(user, orderCount) {
        return `
        
                    <div class="container flex flex-col items-center gap-8 md:flex-row">
                <!-- Avatar -->
                <div>
                    <img src="https://i.pravatar.cc/150" class="object-cover w-32 h-32 border-4 border-white rounded-full shadow-xl" />
                </div>

                <!-- Info -->
                <div class="text-center md:text-left">
                    <h2 class="text-3xl font-bold">${user.name}</h2>
                    <p class="mt-2 text-black/80">Thành viên từ ${new Date(user.createdAt || "").toLocaleDateString("vi-VN")}</p>

                    <div class="flex justify-center gap-8 mt-6 md:justify-start">
                        <div>
                            <h3 class="text-2xl font-bold">${orderCount}</h3>
                            <p class="text-sm text-black/70">Đơn hàng</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
    }
    renderOrderHistory(orders) {
        return `
         <h3 class="mb-8 text-2xl font-bold text-p-900">Lịch sử đơn hàng</h3>

                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-n-200 text-n-500">
                                        <th class="py-3 text-left">Mã đơn</th>
                                        <th class="text-left">Ngày</th>
                                        <th class="text-left">Tổng tiền</th>
                                        <th class="text-left">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${orders
            .map((o) => `
                                    <tr class="border-b border-n-200">
                                        <td class="py-4">#${o.id}</td>
                                        <td>${new Date(o.created_at || "").toLocaleDateString("vi-VN")}</td>
                                        <td>${o.total.toLocaleString("vi-VN")}đ</td>
                                        <td class="font-semibold text-green-600">${o.status}</td>
                                    </tr>
                                    `)
            .join(``)}
                                </tbody>
                            </table>
                        </div>
        
        `;
    }
    renderInfo(user) {
        return `
                        <h3 class="mb-8 text-2xl font-bold text-p-900">Thông tin cá nhân</h3>

                        <form class="grid gap-6 md:grid-cols-2">
                            <div>
                                <label class="text-sm text-n-500">Họ và tên</label>
                                <input
                                    type="text"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                    value="${user.name}"
                                />
                            </div>

                            <div>
                                <label class="text-sm text-n-500">Email</label>
                                <input
                                    type="email"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                    value="${user.email}"
                                />
                            </div>

                            <div>
                                <label class="text-sm text-n-500">Số điện thoại</label>
                                <input
                                    type="text"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                    value="${user.phone}"
                                />
                            </div>

                            <div>
                                <label class="text-sm text-n-500">Địa chỉ</label>
                                <input
                                    type="text"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                    value="${user.address}"
                                />
                            </div>

                            <div class="md:col-span-2">
                                <button
                                    type="submit"
                                    class="px-8 py-3 mt-6 text-white transition-all duration-300 bg-p-900 hover:bg-p-700 rounded-xl"
                                >
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </form>
                
        `;
    }
    renderChangePassword() {
        return `
          <h3 class="mb-8 text-2xl font-bold text-p-900">Đổi mật khẩu</h3>

                        <form id="ChangePassWordForm" class="space-y-6">
                            <div>
                                <label class="text-sm text-n-500">Mật khẩu hiện tại</label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                />
                            </div>

                            <div>
                                <label class="text-sm text-n-500">Mật khẩu mới</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                />
                            </div>
                            <div>
                                <label class="text-sm text-n-500">Nhập lại mật khẩu mới</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    class="w-full px-4 py-3 mt-2 border rounded-lg outline-none border-n-200 focus:ring-2 focus:ring-p-600"
                                />
                            </div>

                            <button type="submit" class="px-8 py-3 text-white transition-all duration-300 bg-p-900 hover:bg-p-700 rounded-xl">
                                Cập nhật mật khẩu
                            </button>
                        </form>
        `;
    }
}
//# sourceMappingURL=ProfileView.js.map