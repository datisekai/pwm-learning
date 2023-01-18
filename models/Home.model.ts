import { ProductModel } from "./Product.model";
import { SpeciesModel } from "./Species.model";

export interface HomeModel {
  species: SpeciesModel[];
  products: ProductModel[][];
}
