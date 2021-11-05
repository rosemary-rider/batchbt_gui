import React from 'react'

interface Props {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    rowCount: number;
    selectedRowCount: number;
}

export const GridHeader: React.FC<Props> = ({ filter, setFilter, rowCount, selectedRowCount }) => {
    return (
        <div className="row">
            <div className="col-6">
                <input type="text" className="form-control" value={filter} placeholder="Quick filter" onChange={({ target: { value } }) => setFilter(value)} />
            </div>
            <div className="col d-flex justify-content-end">
                <div className="d-flex flex-column justify-content-center">
                    <span className="text-end">{`${rowCount} rows${selectedRowCount ? ` (${selectedRowCount} selected)` : ''}`}</span>
                </div>
            </div>
        </div>
    )
}
