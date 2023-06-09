import React from 'react'
import { useAsync } from 'react-async-hook'
import { ModelItem } from "../commons"
const fetchPayslips = async()=> {
    return (await fetch("/api/v1/payslips")).json()
}
export const Payslips = () => {
    const { loading, result, execute } = useAsync(fetchPayslips, [])
  return (
    <>
        {
            !loading &&
            (
            <div className="pt-6">
                <ul className="list-group">
                {
                    result?.map(({ id, total }) => (
                        <ModelItem
                            key={ id }
                            id={ id } name={ total }
                            refetch={ execute }
                            deleteUrl="/api/v1/payslips"
                            primaryRoute={ `/payslips` }
                            txtPrimary="Mostrar"
                            backRoute="/payslips"
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
