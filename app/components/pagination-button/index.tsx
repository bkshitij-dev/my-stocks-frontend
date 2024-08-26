import React from 'react'

const PaginationButton = ({pageNumber, isCurrent, goToPageNumber}: 
        {pageNumber: number, isCurrent: boolean, goToPageNumber: Function}) => {
    return (
        <button className={`px-3 py-2 ${isCurrent ? 'bg-blue-500 text-white': 'bg-white text-black-500'} rounded`}
            onClick={() => goToPageNumber(pageNumber)}>
            {pageNumber}
        </button>
    )
}

export default PaginationButton