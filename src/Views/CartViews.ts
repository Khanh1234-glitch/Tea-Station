import type { CartItem } from "../Model/CartItem.js";

export class CartView {
    render(items: CartItem[]): string {
        if (items.length == 0) {
            return `Khong co san pham`;
        }
        return `
        ${items
            .map(
                (item: CartItem) => `
             <div class="flex gap-6 p-6 transition shadow-lg bg-white/70 backdrop-blur-xs rounded-2xl hover:shadow-xl">
             <div style="width:96px; height:96px" class="w-24 h-24 aspect-[3/4] overflow-hidden rounded-xl bg-white">
                  <img src="../public/assets/${item.product.image}" alt="product" class="w-full h-full object-contain" />
             </div>
                       

                            <div class="flex flex-col justify-between flex-1">
                                <div>
                                    <h3 class="font-semibold text-p-900">${item.product.name}</h3>
                                    <p class="mt-1 text-sm text-n-500">${item.product.basePrice.toLocaleString("vi-VN")}₫</p>
                                    <p class="mt-1 text-sm text-n-500">${item.size?.label ?? 123}(+${item.size?.price.toLocaleString("vi-VN")})</p>
                                    <p class="mt-1 text-sm text-n-500">${item.variant?.label ?? ""}</p>
                                </div>

                                <div class="flex items-center gap-4 mt-4">
                                    <input type="number" value="${Number(item.quantity) || 1}" min="1" class="w-20 px-3 py-2 border border-n-200 rounded-lg" />
                                    <button class="text-sm transition text-n-500 hover:text-p-900">Xóa</button>
                                </div>
                            </div>

                            <div class="self-center font-semibold text-p-900">${item.getTotal().toLocaleString("vi-VN")}₫</div>
                        </div>
            `,
            )
            .join(``)}
        `;
    }
    renderCartRight(total: number): string {
        return `
       
       <h3 class="mb-6 text-lg font-semibold text-p-900">Tóm tắt đơn hàng</h3>

                        <div class="flex justify-between mb-3 text-sm">
                            <span>Tạm tính</span>
                            <span>${total.toLocaleString("vi-VN")}₫</span>
                        </div>

                        <div class="flex justify-between mb-3 text-sm">
                            <span>Vận chuyển</span>
                            <span>Miễn phí</span>
                        </div>

                        <hr class="my-6 opacity-20" />

                        <div class="flex justify-between mb-8 text-lg font-semibold text-p-900">
                            <span>Tổng cộng</span>
                            <span>${total.toLocaleString("vi-VN")}₫</span>
                        </div>
                        <button class="w-full py-4 text-base tracking-wide btn"><a href="./checkout.html">Thanh toán</a></button>
       `;
    }
}
