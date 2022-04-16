export type PaginationResult<Data> = {
  page: number;
  perPage: number;
  totalPages: number;
  data: Data[];
};

export function paginate<Data>(
  data: any[],
  page = 1,
  perPage = 10
): PaginationResult<Data> {
  const indexOfLastData = page * perPage;
  const indexOfFirstData = indexOfLastData - perPage;

  return {
    page,
    perPage,
    totalPages: Math.ceil(data.length / perPage),
    data: data.slice(indexOfFirstData, indexOfLastData),
  };
}
