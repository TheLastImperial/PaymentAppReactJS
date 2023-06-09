import React from 'react'
import { useAsync } from 'react-async-hook'
import { useParams } from 'react-router-dom'
import { PayslipDetailItem } from './PayslipDetailItem'

const fetchPayslip = async( id )=> {
    return (await fetch(`/api/v1/payslips/${ id }.json`)).json()
}
export const Payslip = () => {
    const { id } = useParams()
    const { loading, result:payslip } = useAsync(fetchPayslip, [ id ]);

    return (
        <>
            {           
                !loading &&
                (
                    <div className="card mb-2">
                        <div className="card-header">
                            Numero de empleado: { payslip.employee.id }
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                Nombre: { payslip.employee.name }
                            </li>
                            <li className="list-group-item list-group-item-secondary">
                                <div className="row">
                                    <div className="col-3">
                                        Descripción
                                    </div>
                                    <div className="col-3 text-center">
                                        Valor unitario   
                                    </div>
                                    <div className="col-3 text-center">
                                        Cantidad
                                    </div>
                                    <div className="col-3 d-flex justify-content-end">
                                        Total
                                    </div>
                                </div>
                            </li>
                            {
                                payslip.payslip_details.map(pd => (
                                    <PayslipDetailItem key={pd.id} payslipDetail={ pd }/>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-end">
                                { payslip.total }
                            </li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}
