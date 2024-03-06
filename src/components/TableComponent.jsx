import React from 'react'
import DataTable from 'react-data-table-component'
import {Spinner} from 'flowbite-react'

const Loading = () => {
    return (
        <div className='flex flex-wrap gap-2'>
            <div className='text-center'>
                <Spinner size={'xl'}/>
            </div>
        </div>
    )
} 

const options = {
    rowsPerPageText: 'Registro por pagina....',
    rangeSeparatorText: 'de',
}

const TableComponent = (props) => {
    const { data, columns, onSort, progress } = props
    return (
        <DataTable 
            className='w-full text-left text-sm text-gray-500'
            columns={columns}
            data={data}
            progressPending={progress}
            progressComponent={<Loading/>}
            onSort={onSort}
            pagination
            paginationComponentOptions={options}
            noDataComponent={"Sin registros"}
            
        />
    )
}

export default TableComponent 