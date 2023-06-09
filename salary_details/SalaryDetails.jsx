import React from 'react'
import { GoToNew, ModelItem } from '../commons'
import { useAsync } from 'react-async-hook'

const fetchSalaryDetails = async()=>{
    return (await fetch("/api/v1/salary_details.json")).json()
}
export const SalaryDetails = () => {
    const { loading, result, execute } = useAsync(fetchSalaryDetails, []);

    return (
    <>
        <GoToNew btnText="Nuevo concepto"
            refetch= { execute }
            url="/salary_details/new"
        />
        {
            !loading &&
            (
            <div className="pt-6">
                <ul className="list-group">
                {
                    result.map(({ id, name }) => (
                        <ModelItem
                            key={ id }
                            id={ id } name={ name }
                            refetch={ execute }
                            deleteUrl="/api/v1/salary_details"
                            primaryRoute="/salary_details/edit"
                            txtPrimary={ `Editar` }
                            backRoute="/salary_details"
                        />
                    ))
                }
                </ul>
            </div>
            )
        }
    </>
    )
}
