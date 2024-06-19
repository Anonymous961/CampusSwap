interface PaginationPropTypes {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationPropTypes) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 "
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNum = index + 1;
          return (
            <li key={pageNum}>
              <button
                onClick={() => handlePageClick(pageNum)}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${
                  currentPage === pageNum
                    ? "text-white bg-gray-500"
                    : "text-gray-500 bg-white"
                } border border-gray-300 hover:bg-gray-100`}
              >
                {pageNum}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
