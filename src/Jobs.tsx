import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { ColDef, GridOptions, SelectionChangedEvent, HeaderCheckboxSelectionCallbackParams, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import useFetch from 'use-http'
import { API_URL } from './api'
import { JobDto } from "./dto/job"
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { GridHeader } from './GridHeader'
import { KillButton } from './KillButton'

const jobFields: Array<keyof JobDto> = ['jobKey', 'jobName'];

const colDef: ColDef[] = jobFields.map(key => ({
  field: key
}))

const defaultColDef: ColDef = {
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
  checkboxSelection: isFirstColumn,
  headerCheckboxSelection: isFirstColumn,
  headerCheckboxSelectionFilteredOnly: true
}

function isFirstColumn({ columnApi, column }: HeaderCheckboxSelectionCallbackParams) {
  const displayedColumns = columnApi.getAllDisplayedColumns();
  return displayedColumns[0] === column;
}

export const Jobs: React.FC = () => {
  const [filter, setFilter] = useState('')
  const gridRef = useRef<AgGridReact>(null);
  const [rowCount, setRowCount] = useState(0)
  const [selectedRowCount, setSelectedRowCount] = useState(0)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { loading, error, data = [] } = useFetch<JobDto[]>(`${API_URL}/jobs`, []);
  const onGridReady = useCallback((event: GridReadyEvent) => {
    if (!gridRef.current) return;
    const { api } = gridRef.current
    setRowCount(api.getDisplayedRowCount())
  }, []);
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    if (!gridRef.current) return;
    const { api } = gridRef.current
    const selectedRows = api.getSelectedRows();
    setSelectedRowCount(selectedRows.length);
    setSelectedKeys(selectedRows.map(({ jobKey }) => jobKey));
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
    api.setQuickFilter(filter);
  }, [filter])
  if (error)
    return <div>Error</div>;
  if (loading)
    return <div>Loading...</div>;
  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <KillButton jobKeys={selectedKeys} />
          <button className="btn btn-outline-primary">Resume</button>
          <button className="btn btn-outline-primary">Delete</button>
        </div>
      </div>
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
