import React from 'react'
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom'
import { ModelItem } from "../commons"

const fetchRoles = async() => {
    return (await fetch("/api/v1/roles.json")).json()
}

export const Roles = () => {
    const { loading, result=[], execute } = useAsync(fetchRoles, [])
    const navigate = useNavigate();
    return (
        <>
            <div className="mb-2 d-flex justify-content-end">
                <button type="button"
                    onClick={ () => navigate("/roles/new") }
                    className="btn btn-primary">
                    Nuevo Rol
                </button>
            </div>
            <div className="pt-6">
                <ul className="list-group">
                    {
                        !loading && (
                            result.map(({id, name })=> (
                                <ModelItem key={ id }
                                    id = { id }
                                    name = { name }
                                    refetch = { execute }
                                    deleteUrl="/api/v1/roles"
                                    primaryRoute="/roles/edit"
                                    txtPrimary="Editar"
                                    backRoute="/roles"
                                />
                            ))
                        )
                    }
                </ul>
            </div>
        </>
    )
}
