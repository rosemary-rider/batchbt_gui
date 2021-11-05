import React from 'react';
import { Jobs } from "./Jobs"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout } from './Layout'

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Jobs />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const About: React.FC = () => {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
