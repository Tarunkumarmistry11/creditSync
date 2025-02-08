import PropTypes from 'prop-types';  // Import PropTypes
import { useMemo } from 'react';
import { useTable, useSortBy } from '@tanstack/react-table';

const ReportTable = ({ data }) => {
  const columns = useMemo(() => [
    { Header: 'Credit Card', accessor: 'creditCardBank' },
    { Header: 'Bank', accessor: 'accountNumber' },
    { Header: 'Amount Overdue', accessor: 'amountOverdue' },
    { Header: 'Current Balance', accessor: 'currentBalance' },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="w-full text-left border-collapse border border-gray-700">
      <thead className="bg-gray-800 text-white">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th 
                {...column.getHeaderProps(column.getSortByToggleProps())} 
                className="px-4 py-2 border border-gray-700" 
                key={column.id}  // Added key here
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-gray-900 text-gray-300">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="px-4 py-2 border border-gray-700" key={cell.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// PropTypes validation
ReportTable.propTypes = {
  data: PropTypes.array.isRequired,  // Ensures `data` is an array and is required
};

export default ReportTable;
