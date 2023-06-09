import React from 'react'
import { useAsync } from 'react-async-hook'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployeeCard } from './EmployeeCard'
import { SalaryDetailsList } from './SalaryDetailsList'

const fetchEmployee = async( id )=> {
    return (await fetch(`/api/v1/employees/${ id }.json`)).json()
}

const fetchDetails = async()=> {
    return (await fetch("/api/v1/salary_details/generic")).json()
}

export const NewPayslip = () => {
    const { register, handleSubmit, getValues } = useForm();
    const { id } = useParams()
    const {loading, result } = useAsync(fetchEmployee, [id]);
    const { loading:loadingDetails, result:details } = useAsync(fetchDetails)
    const navigate = useNavigate();

    const onSubmit = () => {
        const salaryDetails = Object.entries(getValues()).map(ele =>{
            return {
                id: Number(ele[0].split("_")[1]),
                value: Number(ele[1])
            }
        })
        const requestBody = {
            "payslip": {
                "employee_id": id,
                "salary_details": salaryDetails
            }
        }
        console.log(requestBody)
        fetch("/api/v1/payslips.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(resp => {
            if( resp.status === 201 ){
                navigate("/employees")
            }
        })
    }

    return (
        <>
            {
                !loading &&
                <EmployeeCard employee={ result } />
            }
            {
                !loading && 
                (
                <form onSubmit={ handleSubmit( onSubmit )}>
                    {
                        !loadingDetails && (
                            <SalaryDetailsList
                                details={ details }
                                register={ register }
                            />
                        )
                    }
                    <div className="d-flex justify-content-end">
                        <button type="submit"
                            className="btn btn-primary">
                            Generar Nomina
                        </button>
                    </div>
                </form>
                )
            }

        </>
    )
}
