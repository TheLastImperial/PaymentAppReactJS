import React from 'react'
import { useAsync } from 'react-async-hook'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { InputInvalidMessage } from '../commons'

const fetchRole = async( id ) => {
    return (await fetch(`/api/v1/roles/${ id }.json`)).json()
}
export const EditRole = () => {
    const { id } = useParams()
    const { loading, result } = useAsync(fetchRole, [ id ])
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate()

    
    const onSubmit = () => {
        const role = {
            "role": {
                "name": getValues("name")
            }
        }
        fetch(`/api/v1/roles/${ id }.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(role)
        })
        .then(resp => {
            if( resp.status === 200 ){
                navigate("/roles")
            }
        })
    }
    return (
        <>
        {
            !loading &&
            (
                <form onSubmit={ handleSubmit(onSubmit)}>
                    <input type="text"
                        className="form-control"
                        placeholder="name"
                        autoComplete="off"
                        defaultValue={ result.name }
                        { ...register("name", { required: true }) }
                        />
                        {
                            errors.name &&
                            <InputInvalidMessage
                            msg="Debe ingresar el nuevo nombre." />
                        }
                    <div className="d-flex justify-content-end">
                        <button type = "submit"
                            className="btn btn-primary">
                            Actualizar
                        </button>
                    </div>
                </form>
            )
        }
        </>
    )
}
