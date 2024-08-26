import React from 'react'

const TableRows = ({ rows }: { rows: React.ReactNode }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {rows}
        </tbody>
    )
}

export default TableRows