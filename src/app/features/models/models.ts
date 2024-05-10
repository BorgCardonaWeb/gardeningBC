
export class subcategorie {
    id!: string;
    name!: string;
    image!: string;
    stock!: boolean
}

export class categorie {
    id!: string;
    name!: string;
    image!: string;
    subcategories!:subcategorie[];
    showSubMenu: boolean = false
}

