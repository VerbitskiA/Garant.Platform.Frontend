export interface FilterPaginationModel {
  typeSortPrice?: string;
  viewBusinessesCode?: string;
  categoryCode?: string;
  minInvest: number;
  maxInvest: number;
  minProfit: number;
  maxProfit: number;
  pageNumber: number;
  countRows: number;
  isGarant: boolean;
}
