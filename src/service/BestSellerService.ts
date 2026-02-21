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
    }
}
