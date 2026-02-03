export class ProductDetailViews {
    renderProductDetail(productDetail) {
        return `
                <div class="grid items-start grid-cols-1 lg:grid-cols-12 gap-14">
                    <!-- ================= LEFT: IMAGES ================= -->
                    <section class="flex flex-col gap-6 lg:col-span-6">
                        <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                            <img src="../public/assets/${productDetail.image}" alt="Zen Garden" class="w-full h-105 object-cover rounded-2xl" />
                        </div>

                        <!-- Thumbnails -->
                        <div class="flex gap-4">        
                            <img src="../public/assets/${productDetail.image}" class="object-cover w-20 h-20 rounded-xl ring-2 ring-p-900" />
                            ${productDetail.images
            .map((img) => `
                                <img src="../public/assets/${img}" class="object-cover w-20 h-20 rounded-xl opacity-70" />
                                `)
            .join(``)}
                            
                        </div>
                    </section>

                    <!-- ================= RIGHT: INFO ================= -->
                    <section class="flex flex-col gap-10 lg:col-span-6">
                        <!-- Title -->
                        <div>
                            <h1 class="text-3xl md:text-4xl font-lobster text-p-900">${productDetail.name}</h1>
                            <p class="mt-2 text-n-500">${productDetail.description}</p>
                        </div>

                        <!-- Price -->
                        <div class="text-2xl font-semibold text-p-900">
                            ${productDetail.basePrice.toLocaleString("vi-VN")}₫
                            <span class="ml-2 text-sm font-normal text-n-500"> / ${productDetail.unit} </span>
                        </div>

                        <!-- Size -->
                        <div>
                            <h3 class="mb-3 font-medium">Kích cỡ</h3>
                            <div class="flex gap-4">
                            ${productDetail.sizes.length
            ? productDetail.sizes
                .map((s, i) => `
                                <label class="px-5 py-2 bg-white border cursor-pointer rounded-xl  ${i === 0 ? "ring-p-900 ring-2" : ""}">
                                    <input type="radio" name="size" hidden ${i === 0 ? "checked" : ""} />
                                    ${s.label} (+${s.price.toLocaleString("vi-VN")}₫)
                                </label>
                                `)
                .join(``)
            : "Chưa có kích cỡ"}
                            </div>
                        </div>

                        <!-- Variants -->
                        <div>
                            <h3 class="mb-3 font-medium">Biến thể</h3>
                            <div class="flex gap-4">
                            ${productDetail.variants
            .map((v, i) => `
                                <label class="px-4 py-2 cursor-pointer rounded-xl border bg-p-50 ${i === 0 ? "ring-2 ring-p-900" : ""} ">
                                    <input type="radio" name="variant" hidden ${i === 0 ? "checked" : ""} />
                                    ${v}
                                </label>
                                `)
            .join(``)}
                            </div>
                        </div>

                        <!-- Quantity -->
                        <div class="flex items-center gap-6">
                            <input type="number" value="1" min="1" class="w-25 px-4 py-3 border border-n-200 rounded-xl" />

                            <button class="px-8 py-4 btn">Thêm vào giỏ</button>
                        </div>

                        <!-- Description -->
                        <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                            <h3 class="mb-4 font-semibold text-p-900">Mô tả sản phẩm</h3>
                            <p class="leading-relaxed text-n-500">
                            ${productDetail.description}
                            </p>
                        </div>

                        <!-- Details -->
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Xuất xứ</h4>
                                <p class="text-sm text-n-500">${productDetail.origin}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hướng dẫn pha</h4>
                                <p class="text-sm text-n-500">${productDetail.brewGuide.tea} · ${productDetail.brewGuide.water} nước · ${productDetail.brewGuide.temperature}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Hạn sử dụng</h4>
                                <p class="text-sm text-n-500">${productDetail.expiry}</p>
                            </div>

                            <div class="p-6 shadow-lg bg-white/70 rounded-2xl">
                                <h4 class="mb-2 font-semibold">Bảo quản</h4>
                                <p class="text-sm text-n-500">${productDetail.storage}</p>
                            </div>
                        </div>
                    </section>
                </div>
        
        `;
    }
}
//# sourceMappingURL=ProductDetailViews.js.map