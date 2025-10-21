export interface PaginatedResponse<T> {
  content: T[];
  size: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
