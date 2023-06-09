import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { YesNotModal } from './YesNotModal';

export const ModelItem = ({
        id,
        name,
        refetch,
        deleteUrl,
        primaryRoute, 
        txtPrimary,
        backRoute

    }) => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const onDelete = () => {
        fetch(`${deleteUrl}/${id}.json`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status == 204){
                refetch()
                navigate( backRoute )
            }
        })
    }

    const onPrimary = () => {
        navigate( `${ primaryRoute }/${ id }` )
    }

    return (
        <>
            <li className="list-group-item d-flex justify-content-between">
                <span className="align-self-center">
                    { `${id} ${name}` }
                </span>
                <div>
                    <button type="button"
                        onClick={ ()=> setShowModal(true) }
                        className="btn btn-danger mx-2">
                        Eliminar
                    </button>
                    <button type="button"
                        onClick={ onPrimary }
                        className="btn btn-primary">
                        { txtPrimary }
                    </button>
                </div>
            </li>
            <YesNotModal
                txt={ `Deseas eliminar a ${ name } ?` }
                show={ showModal }
                onNot={ () => setShowModal(false) }
                onYes={ () => { onDelete(); setShowModal(false)} }
            />
        </>
    )
}
