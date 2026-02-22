export class ProductDetailViews {
    renderProductDetail(product) {
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
                           ${product.sizes
            .map((s, index) => `
                                        <label class="size-option px-5 py-2 rounded-xl cursor-pointer 
                                            ${index === 0 ? "ring-2 ring-p-900" : "ring-1 ring-n-200"}">

                                            <input type="radio"
                                                name="size"
                                                value="${s.label}"
                                                data-price="${s.price}"
                                                ${index === 0 ? "checked" : ""}
                                                hidden />

                                            ${s.label} (+${s.price.toLocaleString("vi-VN")})
                                        </label>
                                    `)
            .join("")}
                         

                            </div>
                        </div>

                        <!-- Variants -->
                        <div>
                            <h3 class="mb-3 font-medium">Biến thể</h3>
                            <div class="flex gap-4">
                            ${product.variants
            .map((v, index) => `
                                            <label class="variant-option px-4 py-2 rounded-xl cursor-pointer
                                                ${index === 0 ? "ring-2 ring-p-900" : "ring-1 ring-n-200"}">

                                                <input type="radio"
                                                    name="variant"
                                                    value="${v.label}"
                                                    ${index === 0 ? "checked" : ""}
                                                    hidden />

                                                ${v.label}
                                            </label>
                                        `)
            .join("")}
                               
                                
                            </div>
                        </div>

                        <!-- Quantity -->
                        <div class="flex items-center gap-6">
                            <input type="number" value="1" min="1" class="w-[100px] px-4 py-3 border border-n-200 rounded-xl" />

                            <button class="px-8 py-4 btn">Thêm vào giỏ</button>
                        </div>

                        <!-- Description -->
                        <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                            <h3 class="mb-4 font-semibold text-p-900">Mô tả sản phẩm</h3>
                            <p class="leading-relaxed text-n-500">
                               ${product.description}
                            </p>
                        </div>

                        <!-- Details -->
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Xuất xứ</h4>
                                <p class="text-sm text-n-500">${product.origin}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hướng dẫn pha</h4>
                                <p class="text-sm text-n-500">${product.brewGuide.tea} · ${product.brewGuide.water} nước · ${product.brewGuide.temperature}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hạn sử dụng</h4>
                                <p class="text-sm text-n-500">${product.expiry}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Bảo quản</h4>
                                <p class="text-sm text-n-500">${product.storage}</p>
                            </div>
                        </div>
                    </section>
                </div>
    `;
    }
}
//# sourceMappingURL=ProductDetailViews.js.map