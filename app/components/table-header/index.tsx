import React from 'react'

const TableHeader = ({ headers }: { headers: string[] }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map(header => (
                    <th key={header} scope="col" className="px-4 py-3.5 text-left text-sm font-bold text-gray-700">
                        <span>{header}</span>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader