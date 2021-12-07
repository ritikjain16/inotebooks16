import React from 'react'

const Alert = (props) => {

    return (
        props.alert && (
            <div className={`alert alert-${props.alert.color}`} role="alert" >
                {props.alert.message}
            </div>
        )
    )
}

export default Alert
