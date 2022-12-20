export interface CategoriesListModel {
  resultCol1?: BusinessCategoryOutput[];
  resultCol2?: BusinessCategoryOutput[];
  resultCol3?: BusinessCategoryOutput[];
  resultCol4?: BusinessCategoryOutput[];
}

interface BusinessCategoryOutput {
  url?: string;
  column: number;
  position: number;
  name?: string;
}
