import { CartItem } from "../Model/CartItem.js";
import type { City } from "../Model/City.js";
import type { District } from "../Model/District.js";
import type { Ward } from "../Model/Ward.js";
export declare class CheckoutView {
    renderSummary(cartItems: CartItem[]): void;
    updateTotal(total: number): void;
    bindPlaceOrder(handler: () => void): void;
    renderDistricts(districts: District[]): void;
    renderCities(city: City): void;
    renderWards(wards: Ward[]): void;
    resetDistrict(): void;
    resetWard(): void;
}
//# sourceMappingURL=CheckoutView.d.ts.map