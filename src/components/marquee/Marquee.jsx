import React from 'react'
import './Marquee.css'

export default function Marquee(props) {
    return (
        <div className="marquee-cover">
            <marquee className={props.classname}>{props.detail}</marquee>
        </div>
    )
}
