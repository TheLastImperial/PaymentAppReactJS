import React from 'react'

export const SalaryDetailsList = ({ details, register}) => {
    return (
        <>
            {
                details?.map(({ id, name })=>(
                    <div className="form-group row mb-1" key={ id }>
                        <label className="col-sm-4 col-form-label"> { name } </label>
                        <div className="col-sm-8">
                            <input 
                                key={ id }
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                defaultValue={ 0 }
                                placeholder={ name }
                                { ...register(`id_${ id }`)}
                                />
                        </div>
                    </div>
                ))
            }
        </>
    )
}
