import React, { useState } from 'react'
import TableHeader from '../table-header'
import TableData from '../table-rows'
import ClientSidePagination from '../client-side-pagination'

const Table = ({headers, rows, data, paginate, itemsPerPage, setPaginatedRows}: 
    {headers: string[], rows: React.ReactNode, data: any[], paginate: boolean, 
        itemsPerPage: number, setPaginatedRows: Function}) => {

    return (
        <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <TableHeader headers={headers} />
                            <TableData rows={rows} />
                        </table>
                        {paginate && <ClientSidePagination data={data} 
                            itemsPerPage={itemsPerPage}
                            setCurrentData={setPaginatedRows}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table