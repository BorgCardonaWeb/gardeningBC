
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


export class product {
    categoriID!: string;
    subcategoriID!: string;
    id!: string;
    SKU!: string;
    name!: string;
    description!: string;
    value!: string;
    stock!: string;
    image!: string;
}


