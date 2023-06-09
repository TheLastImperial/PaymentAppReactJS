import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useAsync } from 'react-async-hook'
import { useNavigate } from 'react-router-dom'
import { EmployeeList } from './EmployeeList'

const fetchEmployees = async( ) => {
  return (await fetch(`/api/v1/employees.json`)).json();
}

export const Employees = () => {
  const { loading, result=[], execute } = useAsync(fetchEmployees, []);
  const [employees, setEmployees] = useState(result);
  const navigate = useNavigate();
  const searchInput = useRef();

  const onSearch = (value) =>{
    if(!value || value.lenght  === 0){
      setEmployees(result)
    }else{
      setEmployees(employees.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())))
    }
  }

  useEffect(() => {
    onSearch(searchInput.value)
  }, [loading])
  
  return (
    <>
      <div className="row mb-4">
        <div className="col-6">
          <input type="text"
            className="form-control"
            placeholder="Buscar"
            ref={ searchInput }
            onChange={ (e)=> { onSearch(e.target.value) } }/>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button type="button"
            onClick={ () => navigate("/employees/new", {state: { refetch: execute}}) }
            className="btn btn-primary">
            Nuevo empleado
          </button>
        </div>
      </div>
      {
        !loading &&
        (
          <EmployeeList employees={ employees }
            refetch = { execute }
          />
        )
      }
    </>
  )
}
