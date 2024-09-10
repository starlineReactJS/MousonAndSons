import React from 'react'

export default function Input(props) {
    return (
        <>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                className={props.className}
                value={props.value}
                defaultValue={props.default}
                placeholder={props.placeholder}
                onChange={props.onchange}
                onClick={props.onClick}
                required />
        </>
    )
}
