import { PaginationProps } from "./Pagination.types";
import { PaginationWrapper, PaginationButton } from "./Pagination.styles";
import calcPagination from "@/utils/calcPagination";

export default function Pagination({
  page,
  setPage,
  totalPages,
  itemsPerPage
}:PaginationProps) {
  
  const pageDisplayCount = 10;

  const { currentSet, startPage, endPage, hasPrev,hasNext } = calcPagination({
    page, //현재 페이지
    totalPages, //전체 페이지수
    pageDisplayCount, //한번에 보여줄 페이지네이션 수
  });

  function generatePageNumbers({ startPage, endPage }:{startPage:number; endPage:number}) {
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  return (
    <PaginationWrapper>
      {currentSet > 1 && (
        <PaginationButton onClick={() => setPage(1)}
          >
            {hasPrev && <div>prev</div>}
        </PaginationButton>
      )}
      {generatePageNumbers({ startPage, endPage }).map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          $active={page === pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      {currentSet < Math.ceil(totalPages / itemsPerPage) && (
        <PaginationButton
          onClick={() => setPage(endPage + 1)}
        >
          {hasNext && <div>next</div>}
        </PaginationButton>
      )}
    </PaginationWrapper>
  );
}