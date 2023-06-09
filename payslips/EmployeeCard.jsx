import React from 'react'

export const EmployeeCard = ( { employee } ) => {
    const { id, name, role } = employee;
    return (
        <>
            <div className="card mb-2">
                <div className="card-header">
                    Numero de empleado: { id }
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Nombre: { name }
                    </li>
                    <li className="list-group-item">
                        Puesto: { role.name }
                    </li>
                </ul>
            </div>
        </>
    )
}
