import React from 'react'

export const InputInvalidMessage = ({ msg }) => {
    const alertStyle  = {
        "marginBottom": "1px",
        "height": "30px",
        "lineHeight": "30px",
        "padding": "0px 15px"
    }
    return (
        <>
            <div className="alert alert-danger mt-1" style={ alertStyle }>
                { msg }
            </div>
        </>
    )
}
