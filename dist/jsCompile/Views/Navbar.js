export class Navbar {
    render(user) {
        return `
                    <div class="flex items-center justify-center navbar">
                <div class="flex items-center justify-between w-full px-4 py-4 max-w-384 md:py-10 md:px-18">
                    <!-- Logo -->
                    <a href="./" class="flex items-center justify-center flex-none">
                        <img src="../public/assets/logo.png" alt="logo" class="w-16 h-16" />
                        <p class="text-lg capitalize font-lobster text-p-900">Tea Station</p>
                    </a>

                    <!-- Nav Links -->
                    <nav class="items-center justify-end hidden w-full gap-4 lg:flex lg:gap-8">
                        <a href="./products.html" class="navLink">Sản Phẩm</a>
                        <a href="./cart.html" class="navLink">Giỏ hàng</a>
                        <a href="./#story" class="navLink">Giới Thiệu</a>
                        <a href="./#contact" class="navLink">Liên Hệ</a>
                        ${!user
            ? ` <a href="./login.html" class="navLink">Đăng nhập</a>
                               <a href="./register.html" class="navLink">Đăng ký</a>
                             `
            : `
                                <a href="profile.html" class="navLink">Xin chào, ${user.name}</a>
                               <a id="logout-link" href="logout.html" class="navLink">Đăng xuất</a>
                             `}
                      
                    </nav>

                    <!-- Hamburger Icon -->
                    <div class="block cursor-pointer lg:hidden" id="toggle_btn">
                        <img src="../public/assets/Menu Icon.svg" alt="hamburger icon" class="size-5" />
                    </div>

                    <!-- Mobile Menu -->
                    <div class="dropdown-menu lg:hidden">
                        <a href="./products.html" class="navLink mobileNavLink">Sản Phẩm</a>
                        <a href="#story" class="navLink mobileNavLink">Giới Thiệu</a>
                        <a href="#contact" class="navLink mobileNavLink">Liên Hệ</a>
                    </div>
                </div>
            </div>`;
    }
    renderFooter() {
        return `
                    <div class="container grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                <!-- BRAND -->
                <div>
                    <h2 class="mb-4 text-2xl font-lobster">Tea Station</h2>
                    <p class="text-sm leading-relaxed text-white/60">
                        Chúng tôi mang đến những dòng trà cao cấp được tuyển chọn kỹ lưỡng, giúp bạn tận hưởng sự thư giãn và cân bằng trong từng tách
                        trà.
                    </p>

                    <!-- Social -->
                    <div class="flex gap-4 mt-6">
                        <a href="#" class="transition hover:text-p-200">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="transition hover:text-p-200">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="transition hover:text-p-200">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <!-- QUICK LINKS -->
                <div>
                    <h3 class="mb-4 text-lg font-semibold">Liên kết nhanh</h3>
                    <ul class="space-y-3 text-sm text-white/60">
                        <li><a href="/products.html" class="transition hover:text-white">Sản phẩm</a></li>
                        <li><a href="/about.html" class="transition hover:text-white">Giới thiệu</a></li>
                        <li><a href="/contact.html" class="transition hover:text-white">Liên hệ</a></li>
                        <li><a href="/cart.html" class="transition hover:text-white">Giỏ hàng</a></li>
                    </ul>
                </div>

                <!-- CONTACT -->
                <div>
                    <h3 class="mb-4 text-lg font-semibold">Thông tin liên hệ</h3>
                    <ul class="space-y-3 text-sm text-white/60">
                        <li>📍 TP Hồ Chí Minh, Việt Nam</li>
                        <li>📞 0823 456 789</li>
                        <li>📧 teastation@gmail.com</li>
                        <li>⏰ 8:00 - 22:00 mỗi ngày</li>
                    </ul>
                </div>

                <!-- NEWSLETTER -->
                <div>
                    <h3 class="mb-4 text-lg font-semibold">Nhận ưu đãi mới</h3>
                    <p class="mb-4 text-sm text-white/60">Đăng ký email để nhận ưu đãi và tin tức mới nhất từ chúng tôi.</p>

                    <form class="flex">
                        <input type="email" placeholder="Nhập email của bạn" class="flex-1 px-4 py-2 text-black rounded-l-lg outline-none" />
                        <button type="submit" class="px-4 transition rounded-r-lg bg-p-700 hover:bg-p-600">Đăng ký</button>
                    </form>
                </div>
            </div>

            <!-- Divider -->
            <div class="container pt-6 mt-12 border-t border-white/10">
                <p class="text-sm text-center text-white/50">© 2026 Tea Station. All rights reserved.</p>
            </div>
        `;
    }
}
//# sourceMappingURL=Navbar.js.map