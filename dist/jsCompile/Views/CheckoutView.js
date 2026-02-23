import { CartItem } from "../Model/CartItem.js";
export class CheckoutView {
    renderSummary(cartItems) {
        const container = document.querySelector(".flex.flex-col.gap-4.mb-6.text-sm");
        if (!container)
            return;
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
    updateTotal(total) {
        const subtotalEl = document.querySelector(".flex.justify-between.mb-3.text-sm span:last-child");
        const totalEl = document.querySelector(".flex.justify-between.mt-6.text-lg span:last-child");
        if (subtotalEl) {
            subtotalEl.textContent = total.toLocaleString("vi-VN") + "₫";
        }
        if (totalEl) {
            totalEl.textContent = total.toLocaleString("vi-VN") + "₫";
        }
    }
    bindPlaceOrder(handler) {
        var _a;
        (_a = document.querySelector("#placeOrderBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handler);
    }
    renderDistricts(districts) {
        const select = document.querySelector("#district");
        if (!select)
            return;
        select.innerHTML = `
            <option value="">Chọn quận/huyện</option>
        `;
        select.innerHTML += districts
            .map((d) => `
              
            <option value="${d.code}">
                ${d.name}
            </option>
        `)
            .join("");
        select.disabled = false;
    }
    renderCities(city) {
        const select = document.querySelector("#city");
        if (!select)
            return;
        select.innerHTML = `
        <option value="">Chọn tỉnh/thành phố</option>
        <option value="${city.code}">
            ${city.name}
        </option>
    `;
    }
    renderWards(wards) {
        const select = document.querySelector("#ward");
        if (!select)
            return;
        select.innerHTML = `
            <option value="">Chọn phường/xã</option>
        `;
        select.innerHTML += wards
            .map((w) => `
            <option value="${w.code}">
                ${w.name}
            </option>
        `)
            .join("");
        select.disabled = false;
    }
    resetDistrict() {
        const select = document.querySelector("#district");
        if (!select)
            return;
        select.innerHTML = `<option value="">Chọn quận/huyện</option>`;
        select.disabled = true;
    }
    resetWard() {
        const select = document.querySelector("#ward");
        if (!select)
            return;
        select.innerHTML = `<option value="">Chọn phường/xã</option>`;
        select.disabled = true;
    }
}
//# sourceMappingURL=CheckoutView.js.map