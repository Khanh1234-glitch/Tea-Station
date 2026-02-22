import { CartItem } from "../Model/CartItem.js";
import { ProductList } from "../Model/ProductList.js";

export class CartView {
    renderItems(cart: CartItem[], products: ProductList[]): string {
        if (!cart.length) return "<p>Giỏ hàng trống</p>";
        return cart
            .map((item) => {
                const product = products.find((p) => p.id === item.product_id);
                console.log("Matching product:", product);
                if (!product) return "";

                return `
            <div class="flex gap-6 p-6 shadow-lg bg-white rounded-2xl">

                <img src="../public/assets/${product.image}"
                    class="w-[96px] h-[96px] object-cover rounded-xl" />

                <div class="flex flex-col justify-between flex-1">
                    <div>
                        <h3 class="font-semibold">${product.name}</h3>
                               <p class="text-sm">
                            ${item.size}  ${
                                product.sizes.find((s) => s.label === item.size)
                                    ? "(+" + product.sizes.find((s) => s.label === item.size)!.price.toLocaleString("vi-VN") + "₫)"
                                    : ""
                            }
                        </p>
                  
                        <p class="text-sm">
                            ${item.variant}
                        </p>
                        <p class="text-sm">
                            ${item.price.toLocaleString("vi-VN")}₫
                        </p>
                    </div>

                    <div class="flex items-center gap-4 mt-4">
                        <input 
                            type="number"
                            min="1"
                            value="${item.quantity}"
                            data-id="${item.product_id}"
                            data-size="${item.size}"
                            data-variant="${item.variant}"
                            max="${product.stock}"  
                            class="quantity-input w-[80px] px-3 py-2 border rounded-lg"
                        />

                        <button 
                            data-id="${item.product_id}"
                            data-size="${item.size}"
                            data-variant="${item.variant}"
                            class="remove-item text-sm text-red-500">
                            Xóa
                        </button>
                    </div>
                </div>

                <div class="self-center font-semibold">
                    ${(item.price * item.quantity).toLocaleString()}₫
                </div>
            </div>
        `;
            })
            .join("");
    }

    renderSummary(cart: CartItem[]): string {
        const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

        return `
            <div class="p-10 bg-white rounded-2xl shadow-xl">
                <h3 class="mb-6 text-lg font-semibold">Tóm tắt đơn hàng</h3>
                        <div class="flex justify-between mb-3 text-sm">
                            <span>Tạm tính</span>
                            <span>${totalPrice.toLocaleString()}₫</span>
                        </div>

                        <div class="flex justify-between mb-3 text-sm">
                            <span>Vận chuyển</span>
                            <span>Miễn phí</span>
                        </div>
                <div class="flex justify-between mb-3 text-sm">
                    <span>Tổng cộng</span>
                    <span>${totalPrice.toLocaleString()}₫</span>
                </div>

                <button class="w-full py-4 btn mt-6">
                    Thanh toán
                </button>
            </div>
        `;
    }
}
