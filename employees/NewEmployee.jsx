import React from 'react'
import { useAsync } from 'react-async-hook';
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';
import { InputInvalidMessage } from '../commons';

const fetchRoles = async() => {
    return (await fetch("/api/v1/roles.json")).json()
}
export const NewEmployee = () => {
    const { loading, result } = useAsync(fetchRoles, [])
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const onSubmit =() =>{
        const emp = {
            "employee": getValues()
        };

        fetch("/api/v1/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emp)
        })
        .then(resp => {
            if(resp.status === 201){
                location.state?.fetch()
                navigate("/employees")
            }
        })
    }

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <input type="text"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Nombre"
                {...register("name", { required: true }) } />
                {errors.name &&
                    <InputInvalidMessage msg="Debe ingresar el nombre del nuevo empleado" />
                }

                {
                    !loading && (
                    <select className="form-select mt-2"
                    defaultValue={result[0]?.id}
                    { ...register("role_id")}>
                        {
                        result.map(({ id, name}) => (
                            <option key={ id } value={ id }>
                            { name }
                            </option>
                        ))
                        }
                    </select>
                )
                }

                <div className="d-flex justify-content-end mt-2">
                    <button type="submit"
                        className="btn btn-primary">
                        Crear
                    </button>
                </div>
            </form>
        </>
    )
}

