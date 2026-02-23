import { CartItem } from "../Model/CartItem.js";
import type { City } from "../Model/City.js";
import type { District } from "../Model/District.js";
import type { Ward } from "../Model/Ward.js";

export class CheckoutView {
    renderSummary(cartItems: CartItem[]): void {
        const container = document.querySelector(".flex.flex-col.gap-4.mb-6.text-sm");

        if (!container) return;

        container.innerHTML = cartItems
            .map((item) => {
                const lineTotal = item.price * item.quantity;

                return `
                <div class="flex justify-between">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${lineTotal.toLocaleString("vi-VN")}₫</span>
                </div>
            `;
            })
            .join("");
    }

    updateTotal(total: number): void {
        const subtotalEl = document.querySelector(".flex.justify-between.mb-3.text-sm span:last-child");

        const totalEl = document.querySelector(".flex.justify-between.mt-6.text-lg span:last-child");

        if (subtotalEl) {
            subtotalEl.textContent = total.toLocaleString("vi-VN") + "₫";
        }

        if (totalEl) {
            totalEl.textContent = total.toLocaleString("vi-VN") + "₫";
        }
    }

    bindPlaceOrder(handler: () => void): void {
        document.querySelector("#placeOrderBtn")?.addEventListener("click", handler);
    }
    renderDistricts(districts: District[]): void {
        const select = document.querySelector("#district") as HTMLSelectElement;
        if (!select) return;

        select.innerHTML = `
            <option value="">Chọn quận/huyện</option>
        `;

        select.innerHTML += districts
            .map(
                (d) => `
              
            <option value="${d.code}">
                ${d.name}
            </option>
        `,
            )
            .join("");

        select.disabled = false;
    }
    renderCities(city: City): void {
        const select = document.querySelector("#city") as HTMLSelectElement;
        if (!select) return;

        select.innerHTML = `
        <option value="">Chọn tỉnh/thành phố</option>
        <option value="${city.code}">
            ${city.name}
        </option>
    `;
    }
    renderWards(wards: Ward[]): void {
        const select = document.querySelector("#ward") as HTMLSelectElement;
        if (!select) return;

        select.innerHTML = `
            <option value="">Chọn phường/xã</option>
        `;

        select.innerHTML += wards
            .map(
                (w) => `
            <option value="${w.code}">
                ${w.name}
            </option>
        `,
            )
            .join("");

        select.disabled = false;
    }

    resetDistrict(): void {
        const select = document.querySelector("#district") as HTMLSelectElement;
        if (!select) return;

        select.innerHTML = `<option value="">Chọn quận/huyện</option>`;
        select.disabled = true;
    }

    resetWard(): void {
        const select = document.querySelector("#ward") as HTMLSelectElement;
        if (!select) return;

        select.innerHTML = `<option value="">Chọn phường/xã</option>`;
        select.disabled = true;
    }
}
