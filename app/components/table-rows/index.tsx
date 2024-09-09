import React from 'react'

const TableRows = ({ rows }: { rows: React.ReactNode }) => {

    const isArray = (node: React.ReactNode): node is React.ReactNode[] => {
        return Array.isArray(node);
    };

    const isEmptyArray = isArray(rows) && rows.length === 0;

    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            <>{isEmptyArray ?
                <tr>
                    <td>No data available</td>
                </tr>

                : <>{ rows }</>}</>
        </tbody>
    )
}

export default TableRows