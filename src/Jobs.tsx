import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { API_URL } from './api'
import useFetch from 'use-http'
import { Person } from "./types/person"
import { ColDef, GridOptions, SelectionChangedEvent, HeaderCheckboxSelectionCallbackParams, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { GridHeader } from './GridHeader'

function isFirstColumn(params: HeaderCheckboxSelectionCallbackParams) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

const defaultColDef: ColDef = {
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
  checkboxSelection: isFirstColumn,
  headerCheckboxSelection: isFirstColumn,
  headerCheckboxSelectionFilteredOnly: true
}

export const Jobs: React.FC = () => {
  const [filter, setFilter] = useState('')
  const gridRef = useRef<AgGridReact>(null);
  const [rowCount, setRowCount] = useState(0)
  const [selectedRowCount, setSelectedRowCount] = useState(0)
  const { loading, error, data = [] } = useFetch<Person[]>(`${API_URL}/persons`, []);
  const colDef = useMemo<ColDef[]>(
    () => [
      { field: 'firstName' },
      { field: 'lastName' },
      { field: 'age' }
    ],
    []
  );
  const onGridReady = useCallback((event: GridReadyEvent) => {
    if (!gridRef.current) return;
    const { api } = gridRef.current
    setRowCount(api.getDisplayedRowCount())
  }, []);
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    if (!gridRef.current) return;
    const { api } = gridRef.current
    const selectedRows = api.getSelectedRows()
    console.log(selectedRows)
    setSelectedRowCount(selectedRows.length)
  }, []);
  const gridOptions = useMemo<GridOptions>(
    () => ({
      defaultColDef,
      suppressRowClickSelection: true,
      rowSelection: 'multiple',
      onGridReady,
      onSelectionChanged,
    }), [onGridReady, onSelectionChanged]
  );
  useEffect(() => {
    const { current: grid } = gridRef;
    if (!grid) return;
    const { api } = grid
    api.setQuickFilter(filter)
  }, [filter])
  if (error)
    return <div>Error</div>;
  if (loading)
    return <div>Loading...</div>;
  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-3">
        <GridHeader filter={filter} setFilter={setFilter} rowCount={rowCount} selectedRowCount={selectedRowCount} />
      </div>
      <AgGridReact
        reactUi={true}
        ref={gridRef}
        className="ag-theme-alpine"
        animateRows={true}
        columnDefs={colDef}
        gridOptions={gridOptions}
        rowData={data}
      />
    </div >
  );
}
