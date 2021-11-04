import React, {useRef, useMemo} from 'react';
import {API_URL} from './api'
import useFetch from 'use-http'
import { Person } from "./types/person"
import {AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function Persons() {
  const gridRef = useRef<AgGridReact>(null);
  const { loading, error, data = [] } = useFetch<Person[]>(`${API_URL}/persons`, []);
  const columnDefs = useMemo(
    () => [
      { field: 'firstName'},
      { field: 'lastName'},
    ],
    []
  );
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1
    }),
    []
  );
  if (error)
    return <div>Error</div>;
  if (loading)
    return <div>Loading...</div>;
  return (
    <AgGridReact
      // turn on AG Grid React UI
      reactUi={true}
      // used to access grid API
      ref={gridRef}
      // all other properties as normal...
      className="ag-theme-alpine"
      animateRows={true}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={data}
    />
  );
}
