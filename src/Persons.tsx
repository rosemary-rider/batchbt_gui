import React from 'react';
import useFetch from 'use-http'
import { Person } from "./types/person"
import {API_URL} from './api'

export function Persons() {
  const { loading, error, data = [] } = useFetch<Person[]>(`${API_URL}/persons`, []);
  if (error)
    return <div>Error</div>;
  if (loading)
    return <div>Loading...</div>;
  return (
    <ul>
      {data.map(item => (
        <li key={item.firstName}>
          {item.firstName} {item.lastName}
        </li>
      ))}
    </ul>
  );
}
