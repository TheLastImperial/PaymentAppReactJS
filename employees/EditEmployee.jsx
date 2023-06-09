import React, { useCallback, useEffect } from 'react'
import { useAsync } from 'react-async-hook';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { InputInvalidMessage } from '../commons';

const fetchEmployee = async( id ) => {
    return (await fetch(`/api/v1/employees/${id}.json`)).json();
}

const fetchRoles = async() => {
    return (await fetch("/api/v1/roles.json")).json()
}

export const EditEmployee = () => {
    const { loading:loadingRoles, result:roles=[] } = useAsync(fetchRoles, [])
    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm();
    const { id } = useParams()
    const { loading:loadingEmployee, result:employee } = useAsync(fetchEmployee, [ id ])
    const navigate = useNavigate()

    const onSubmit = useCallback(()=>{
        const emp = {
            "employee":{
                name: getValues("name")
            }
        };
    
        fetch(`/api/v1/employees/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify(emp),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status == 200){
                navigate("/employees")
            }
        })
    }, [ id ], )

    useEffect(() => {
        if( loadingRoles || loadingEmployee )
            return;

        setValue("role_id", employee.role.id)
        setValue("name", employee.name)
    }, [loadingEmployee, loadingRoles, employee])

    return (
        <>
            {
                (
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <input 
                            autoComplete="off"
                            placeholder="Nombre"
                            className="form-control"
                            {...register("name", { required: true })} />
                        {
                            errors.name &&
                            <InputInvalidMessage
                            msg="Ingrese el nuevo nombre." />
                        }

                        <select className="form-select mt-2"
                            { ...register("role_id")}>
                            {
                                roles.map(({ id, name}) => (
                                    <option key={ id } value={ id }>
                                    { name }
                                    </option>
                                ))
                            }
                        </select>

                        <div className="d-flex justify-content-end">
                            <input type="submit"
                                className="btn btn-primary mt-2"
                                value="Actualizar" />
                        </div>
                    </form>
                )
            }
        </>
    )
}
