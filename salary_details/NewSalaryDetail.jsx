import React from 'react'
import { useAsync } from 'react-async-hook';
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';

const fetchRoles = async() => {
  return (await fetch("/api/v1/roles.json")).json()
}


export const NewSalaryDetail = () => {
  const {handleSubmit, getValues, register } = useForm();
  const { loading, result } = useAsync(fetchRoles, []);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = () => {
    const salaryDetail = {
      "salary_detail": getValues()
    }
    fetch("/api/v1/salary_details.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(salaryDetail)
    })
    .then(resp => {
      if( resp.status === 201 ){
        location.status?.refetch();
        navigate("/salary_details")
      }
    })
  }

  return (
    <>
      <form onSubmit={ handleSubmit( onSubmit )}>
        <input type="text"
          className="form-control mb-2"
          autoComplete="off"
          placeholder="Nombre"
          { ...register("name") } />

        <input type="text"
          className="form-control mb-2"
          autoComplete="off"
          placeholder="Valor"
          { ...register("value") } />
        
        <input type="text"
          className="form-control mb-2"
          autoComplete="off"
          placeholder="Valor condicional"
          { ...register("conditional_value") } />

        <div className="form-check form-check-inline">
          <input type="checkbox"
          className="form-check-input mb-2"
          { ...register("is_quantity") } />
          <label className="form-check-label"
            htmlFor="is_quantity">
            Es cantidad
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input type="checkbox"
          className="form-check-input mb-2"
          { ...register("is_discount") } />
          <label className="form-check-label"
            htmlFor="is_discount">
            Es descuento
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input type="checkbox"
          className="form-check-input mb-2"
          { ...register("is_main") } />
          <label className="form-check-label"
            htmlFor="is_main">
            Es principal
          </label>
        </div>
        
        {
          !loading && (
            <select className="form-select mb-2"
              defaultValue={result[0].id}
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

        <div className="d-flex justify-content-end">
          <button type="submit"
            className="btn btn-primary">
            Crear
          </button>
        </div>
      </form>
    </>
  )
}
