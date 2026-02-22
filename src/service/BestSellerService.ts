<<<<<<< HEAD
import { Benefits, BestSeller, HeadingBestSeller, ProductBestSeller } from "../Model/BestSellers.js";
import { ApiService } from "./ApiService.js";

export class BestSellerService extends ApiService {
    async getAll(): Promise<BestSeller> {
        const data: BestSeller = await this.get<BestSeller>("/bestSellers");
        const heading = new HeadingBestSeller(data.heading.subTitle, data.heading.title);
        const products = data.products.map(
            (p) =>
                new ProductBestSeller(
                    p.id,
                    p.name,
                    p.image,
                    p.description,
                    p.benefits.map((b) => new Benefits(b.title, b.percentage, b.position)),
                ),
        );
        return new BestSeller(data.id, data.type, heading, data.description, products);
=======
import { ApiService } from "./ApiService.js";
import { BestSeller, Heading, BestSellerProduct, Benefit } from "../Model/BestSeller.js";

export class BestSellerService extends ApiService {
    async getBestSeller(): Promise<BestSeller> {
        const data: any = await this.getOne("/bestSellers");

        return new BestSeller(
            data.id,
            data.type,
            new Heading(data.heading.subTitle, data.heading.title),
            data.description,
            data.products.map(
                (product: any) =>
                    new BestSellerProduct(
                        product.id,
                        product.name,
                        product.image,
                        product.description,
                        product.benefits.map(
                            (benefit: any) =>
                                new Benefit(
                                    benefit.title,
                                    benefit.percentage,
                                    benefit.position, // optional
                                ),
                        ),
                    ),
            ),
        );
>>>>>>> cc98698c88470ada049c5cf5ea8b3b8cfdb90914
    }
}
