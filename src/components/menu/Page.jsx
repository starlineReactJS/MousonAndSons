import React from 'react'
import { Link } from 'react-router-dom'

export default function Page(props) {
    return (
        <li className="nav-item">
            <Link className={props.className} to={props.path} onClick={props.onClick}>{props.pageName}</Link>
        </li>
    )
}
