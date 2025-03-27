import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPaginate from "react-paginate";

const PaginationBar = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-center p-3 bottom-0 right-6">
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={(data) => {
          setCurrentPage(data.selected + 1);
        }}
        forcePage={currentPage - 1}
        containerClassName="flex items-center"
        pageClassName="rounded-full w-8 h-8 flex items-center justify-center mx-2 border border-[#d1d5db] bg-white text-black hover:bg-[#2B7CD6] hover:text-white transition"
        activeClassName="!bg-[#2B7CD6] !text-white !border-[#2B7CD6]"
        disabledClassName="text-gray-500 cursor-not-allowed"
        previousClassName="text-2xl text-black hover:text-[#2B7CD6] transition"
        nextClassName="text-2xl text-black hover:text-[#2B7CD6] transition"
      />
    </div>
  );
};

export default PaginationBar;
