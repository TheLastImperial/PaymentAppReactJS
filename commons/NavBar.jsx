import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {

    const setActive = ({ isActive, isPending }) => {
        let cName = "nav-item nav-link"
        let addClass = ""
        if ( isPending ){
            addClass =  "pending";
        }else if( isActive ){
            addClass =  "active";
        }
        return `${ cName } ${ addClass }`;
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
                <div className="container-fluid">
                    <a className="navbar-brand">Pagos</a>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={ setActive }
                                to="/employees">
                                Empleados
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={ setActive }
                                to="/roles">
                                Roles
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={ setActive }
                                to="/salary_details">
                                Conceptos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={ setActive }
                                to="/payslips">
                                Nominas
                            </NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
