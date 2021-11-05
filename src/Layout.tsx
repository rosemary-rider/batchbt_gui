import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";

export const Layout: React.FC = () => {
    return (
        <>
            <header className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div className="container-xxl">
                    <Link className="navbar-brand" to="/">Batchbt</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Jobs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* <Outlet> renders whatever child route is currently active */}
            <main className="container flex-grow-1 mb-3">
                <Outlet />
            </main>
        </>
    );
}
