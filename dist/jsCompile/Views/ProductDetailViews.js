export class ProductDetailViews {
    renderProductDetail(product, productVariant, productAttribute) {
        return `
                        <div class="grid items-start grid-cols-1 lg:grid-cols-12 gap-14">
                    <!-- ================= LEFT: IMAGES ================= -->
                    <section class="flex flex-col gap-6 lg:col-span-6">
                        <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                            <img id="main-product-image" src="../public/assets/${product.image}" alt="Zen Garden" class="w-full h-[420px] object-cover rounded-2xl" />
                        </div>

                        <!-- Thumbnails -->
                            <div class="flex gap-4">
                                ${product.images
            .map((img, index) => `
                                    <img 
                                        src="../public/assets/${img}" 
                                        data-image="../public/assets/${img}"
                                        class="thumbnail object-cover w-20 h-20 rounded-xl cursor-pointer 
                                        ${index === 0 ? "ring-2 ring-p-900" : "ring-1 ring-n-200"}" />
                                `)
            .join("")}
                            </div>
                    </section>

                    <!-- ================= RIGHT: INFO ================= -->
                    <section class="flex flex-col gap-10 lg:col-span-6">
                        <!-- Title -->
                        <div>
                            <h1 class="text-3xl md:text-4xl font-lobster text-p-900">${product.name}</h1>
                            <p class="mt-2 text-n-500">${product.description}</p>
                        </div>

                        <!-- Price -->
                        <div class="text-2xl font-semibold text-p-900">
                        <span id="product-price">
                        ${product.basePrice.toLocaleString(`vi-VN`)}₫
                        </span>
                            <span class="ml-2 text-sm font-normal text-n-500"> / ${product.unit} </span>
                        </div>

                        <!-- Size -->
                        <div>
                            <h3 class="mb-3 font-medium">Kích cỡ</h3>
                            <div class="flex gap-4">
                   ${productVariant
            .filter((v) => v.status !== "inactive")
            .map((s, index) => `
        <label class="size-option px-5 py-2 rounded-xl cursor-pointer 
            ${index === 0 ? "ring-2 ring-p-900" : "ring-1 ring-n-200"}">

            <input type="radio"
                name="size"
                value="${s.size}"
                data-price="${s.extra_price}"
                data-id="${s.id}"
                ${index === 0 ? "checked" : ""}
                hidden />

            ${s.size} (+${s.extra_price.toLocaleString("vi-VN")})
        </label>
    `)
            .join("")}
                         

                            </div>
                        </div>

                        <!-- Variants -->

                        <!-- Quantity -->
                        <div class="flex items-center gap-6">
                            <input id="product-quantity" type="number" value="1" min="1" max="${product.stock}" class="w-[100px] px-4 py-3 border border-n-200 rounded-xl" />

                            <button data-id="${product.id}" id="add-to-cart" class="px-8 py-4  btn">Thêm vào giỏ</button>
                        </div>

                        <!-- Description -->
                        <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                            <h3 class="mb-4 font-semibold text-p-900">Mô tả sản phẩm</h3>
                            <p class="leading-relaxed text-n-500">
                               ${product.description}
                            </p>
                        </div>

                        <!-- Details -->
                        ${productAttribute
            .map((a) => `
                            
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Xuất xứ</h4>
                                <p class="text-sm text-n-500">${a.origin}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hướng dẫn pha</h4>
                                <p class="text-sm text-n-500">${a.brew_guide}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hạn sử dụng</h4>
                                <p class="text-sm text-n-500">${a.shelf_life}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Bảo quản</h4>
                                <p class="text-sm text-n-500">${a.storage}</p>
                            </div>
                        </div>
                            `)
            .join(``)}
                        
                    </section>
                </div>
    `;
    }
}
//# sourceMappingURL=ProductDetailViews.js.map