import React, { useEffect, useState } from 'react'
import PaginationButton from '../pagination-button';

const ClientSidePagination = ({ data, itemsPerPage, setCurrentData }:
    { data: any[], itemsPerPage: number, setCurrentData: Function }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        updateCurrentData();
    }, [currentPage]);

    const updateCurrentData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentData(data.slice(startIndex, endIndex));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToPageNumber = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex items-center justify-end mt-4 space-x-2">
            {/* Previous Button */}
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                &lt;
            </button>
            
            {(currentPage >= 3) &&
                <>
                    <PaginationButton pageNumber={1} isCurrent={false} goToPageNumber={goToPageNumber} />
                    ...
                </>
            }

            {(currentPage == totalPages) && (totalPages > 2) &&
                <PaginationButton pageNumber={currentPage - 2} isCurrent={false} goToPageNumber={goToPageNumber} />
            }

            {(currentPage > 1) && 
                <PaginationButton pageNumber={currentPage - 1} isCurrent={false} goToPageNumber={goToPageNumber} />
            }

            {/* Current Page Button */}
            <PaginationButton pageNumber={currentPage} isCurrent={true} goToPageNumber={goToPageNumber} />

            {(currentPage < totalPages) &&
                <PaginationButton pageNumber={currentPage + 1} isCurrent={false} goToPageNumber={goToPageNumber} />
            }

            {(currentPage == 1) && (totalPages > 2) &&
                <PaginationButton pageNumber={currentPage + 2} isCurrent={false} goToPageNumber={goToPageNumber} />
            }
            {(currentPage <= (totalPages-2)) &&
                <>
                    ...
                    <PaginationButton pageNumber={totalPages} isCurrent={false} goToPageNumber={goToPageNumber} />
                </>
            }

            {/* Next Button */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                &gt;
            </button>
        </div>


    )
}

export default ClientSidePagination