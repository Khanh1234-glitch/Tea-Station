export class pageProducts {
    id: string;
    slug: string;
    banner: string;
    subtitle: string;
    title: string;
    description: string;
    constructor(id: string, slug: string, banner: string, subTitle: string, title: string, description: string) {
        this.id = id;
        this.slug = slug;
        this.banner = banner;
        this.subtitle = subTitle;
        this.title = title;
        this.description = description;
    }
}
