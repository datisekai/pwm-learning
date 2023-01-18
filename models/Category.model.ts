export interface CategoryModel {
    id: number;
    name: string;
    speciesId: number;
    createdAt: Date;
    updatedAt: Date;
    species: Species;
}

 interface Species {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}