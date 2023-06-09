import React from 'react'
import { useNavigate } from 'react-router-dom'

export const GoToNew = ({btnText, url, refetch }) => {
    const navigate = useNavigate();
  return (
    <>
        <div className="mb-2 d-flex justify-content-end">
            <button type="button"
                onClick={ () => navigate(url, {state: { refetch }}) }
                className="btn btn-primary">
                { btnText }
            </button>
        </div>
    </>
  )
}
