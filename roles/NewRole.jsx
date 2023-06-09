import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { InputInvalidMessage } from '../commons'

export const NewRole = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const location = useLocation();
    const navigate = useNavigate()

    const onSubmit = () => {
        const role = {
            "role": {
                "name": getValues("name")
            }
        }

        fetch("/api/v1/roles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(role)
        })
        .then(resp=> {
            if(resp.status === 201){
                location.status?.refetch()
                navigate("/roles")
            }
        })

    }
    return (
    <>
        <form onSubmit={ handleSubmit( onSubmit ) }>
            <input type="text"
                className="form-control"
                autoComplete="off"
                placeholder="Nombre"
                {...register("name", { required: true })}
            />
            {
                errors.name &&
                <InputInvalidMessage
                msg="Debe ingresar el nombre del nuevo rol" />
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
