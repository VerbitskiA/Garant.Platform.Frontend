export interface InitCatalogFranchiseRequest {
  pageNumber: number;
  countRows: number;
}

//Response === Output
export interface InitCatalogFranchiseResponse {
  results?: any[];
  pageData: PaginationOutput;
  totalCount: number;
  isLoadAll: boolean;
  isVisiblePagination: boolean;
  countAll: number;
}

interface PaginationOutput {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
