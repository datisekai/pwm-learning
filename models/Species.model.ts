 interface Category {
    id: number;
    name: string;
    speciesId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpeciesModel {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    categories: Category[];
    thumbnail:string;
}