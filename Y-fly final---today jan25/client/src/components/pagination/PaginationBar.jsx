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
        pageRangeDisplayed={2}
        onPageChange={(data) => {
          setCurrentPage(data.selected + 1);
        }}
        forcePage={currentPage - 1} 
        containerClassName="flex items-center"
        pageClassName="rounded-full w-7 h-7 bg-slate-800 flex items-center justify-center mx-2"
        activeClassName="bg-[#3483eb] text-white"
        disabledClassName="text-gray-500"
        previousClassName="text-2xl"
        nextClassName="text-2xl"
      />
    </div>
  );
};

export default PaginationBar;