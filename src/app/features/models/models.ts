
export class subcategorie {
    id!: string;
    name!: string;
    image!: string;
    stock!: boolean;
}

export class categorie {
    id!: string;
    name!: string;
    image!: string;
    subcategories!:subcategorie[];
    showSubMenu: boolean = false;
    stock!: boolean;
}


export class product {
    categoriID!: string;
    subcategoriID!: string;
    id!: string;
    sku!: string;
    name!: string;
    description!: string;
    value!: string;
    stock!: string;
    image!: string;
    loadindData: boolean = false;
    quantities: number = 1;
    stockQuantity: number = 0;
    originalValue: number = 1;
    isLoading : boolean = false
}

export class userModel {
    name!: string;
    lastName!: string;
    address!: string;
    city!: string;
    postalCode!: string;
    phoneNumber!: string;
    email!: string;
    password!: string;
    phonePrefix!: string;
}


