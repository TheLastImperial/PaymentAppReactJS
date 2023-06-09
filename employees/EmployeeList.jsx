import React from 'react'

import { EmployeeItem } from "./EmployeeItem"

export const EmployeeList = ({ employees, refetch }) => {
    return (
        <>

            <div className="pt-6">
                <ul className="list-group">
                    {
                    employees.map(employee => (
                        <EmployeeItem key={ employee.id }
                        id={ employee.id }
                        name={employee.name}
                        refetch={ refetch }
                        />
                    ))
                    }
                </ul>
            </div>

        </>
    )
}
