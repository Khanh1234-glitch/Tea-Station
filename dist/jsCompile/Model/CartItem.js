import { ProductList, Size, Variants } from "./ProductList.js";
export class CartItem {
    constructor(product, size, variant, quantity) {
        this.product = product;
        this.size = size;
        this.variant = variant;
        this.quantity = quantity;
    }
    getTotal() {
        var _a, _b;
        return (this.product.basePrice + ((_b = (_a = this.size) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0)) * this.quantity;
    }
    getSize() {
        return this.size ? this.size.label : "Không có size";
    }
    static isTheSame(a, b) {
        var _a, _b, _c, _d;
        return a.product.id === b.product.id && ((_a = a.size) === null || _a === void 0 ? void 0 : _a.id) === ((_b = b.size) === null || _b === void 0 ? void 0 : _b.id) && ((_c = a.variant) === null || _c === void 0 ? void 0 : _c.id) === ((_d = b.variant) === null || _d === void 0 ? void 0 : _d.id);
    }
}
//# sourceMappingURL=CartItem.js.map