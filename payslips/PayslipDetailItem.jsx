import React from 'react'

export const PayslipDetailItem = ({payslipDetail}) => {
    const {description, quantity, total} = payslipDetail;
    return (
        <>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-3">
                        { `${ description }` }
                    </div>
                    <div className="col-3 text-center">
                        { quantity < 1 ? 1 : `${ total/quantity }` }      
                    </div>
                    <div className="col-3 text-center">
                        { `${ quantity }` }
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        { `${ total }` }
                    </div>
                </div>
            </li>
        </>
    )
}
