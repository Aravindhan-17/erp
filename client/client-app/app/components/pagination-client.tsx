"use client";

import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationClientProps {
  pageCount: number;
}

export function PaginationClient({ pageCount }: PaginationClientProps) {
  const handlePageClick = (_event: { selected: number }) => {
    // Intentionally left blank or handle logic here
  };

  return (
    <div className="mt-12 flex justify-center">
      <ReactPaginate
        breakLabel={<MoreHorizontal size={16} />}
        nextLabel={<ChevronRight size={18} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<ChevronLeft size={18} />}
        renderOnZeroPageCount={null}
        containerClassName="flex gap-2"
        pageLinkClassName="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium hover:bg-gray-50 text-gray-700 transition"
        previousLinkClassName="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium hover:bg-gray-50 text-gray-700 transition"
        nextLinkClassName="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium hover:bg-gray-50 text-gray-700 transition"
        activeLinkClassName="!border-primary !bg-primary !text-white hover:!bg-primary"
        disabledLinkClassName="!text-gray-300 !cursor-not-allowed hover:!bg-white"
        breakLinkClassName="flex h-10 w-10 items-center justify-center font-medium text-gray-500"
      />
    </div>
  );
}
